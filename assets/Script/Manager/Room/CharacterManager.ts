import { _decorator, Component, Node, Vec2 } from 'cc';
import { CharacterController } from '../../Character/CharacterController';
import { RoomManager } from '../Layer/RoomManager';
import { ERoundStatus } from '../../Enum/EStatus';
import { CharacterAnimation } from '../../Character/CharacterAnimation';
import { CName } from '../../Constant/CName';
import { CEvent } from '../../Constant/CEvent';
import { RoundManager } from '../Layer/RoundManager';
const { ccclass, property } = _decorator;

@ccclass('CharacterManager')
export class CharacterManager extends Component {
    public static instance: CharacterManager = null;

    @property(CharacterController)
    characterController: CharacterController = null;

    @property(CharacterAnimation)
    characterAnimation: CharacterAnimation = null;

    @property(RoomManager)
    roomManager: RoomManager = null;

    @property(Node)
    bulletManagerNode: Node = null;

    private moveDirectionY: number = 0;
    private isAlive: boolean = true;

    protected onLoad(): void {
        if (!CharacterManager.instance) {
            CharacterManager.instance = this;
        }
    }

    protected start(): void {
        this.registerEvents();
        this.reset();
    }

    protected onEnable(): void {
        this.reset();
    }

    protected update(dt: number): void {
        this.characterAnimation.pauseAnimation(RoundManager.pauseGame);
        if (RoundManager.pauseGame || RoundManager.isWaiting) {
            return;
        }
        this.move(dt);
    }

    protected onDestroy(): void {
        this.node.targetOff(this);
        this.roomManager.node.targetOff(this);
        this.unscheduleAllCallbacks();
        CharacterManager.instance = null;
    }

    private registerEvents(): void {
        this.node.on(CName.INPUT.MOVE_UP, this.setDirection, this);
        this.node.on(CName.INPUT.MOVE_DOWN, this.setDirection, this);
        this.node.on(CName.INPUT.STOP_MOVING, this.setDirection, this);
        this.node.on(CName.INPUT.SWITCH_BULLET, this.onSwitchBullet, this);

        this.node.on(CEvent.ROUND.PLAYER_TAKE_DAMAGE, this.takeDamage, this);

        this.roomManager.node.on(CEvent.ROUND.INIT_ROUND, this.reset, this);
        this.roomManager.node.on(CEvent.ROUND.RESET_ROUND, this.reset, this);
    }

    private setDirection(direction: number): void {
        this.moveDirectionY = direction;
    }

    private move(dt: number): void {
        if (!this.isAlive) {
            return;
        }
        if (!this.characterController || this.moveDirectionY === 0) {
            this.characterAnimation.setAnimation(0, CName.ANIMATION.IDLE, true);
            return;
        }

        const characterNode = this.characterController.node;
        const currentPosition = characterNode.position;
        if (!this.checkValidMove(currentPosition.y, this.characterController.stats.movementLimit)) {
            this.characterAnimation.setAnimation(0, CName.ANIMATION.IDLE, true);
            return;
        }

        this.characterAnimation.setAnimation(0, CName.ANIMATION.RUN, true);

        characterNode.setPosition(
            currentPosition.x,
            currentPosition.y + dt * this.characterController.stats.moveSpeed * this.moveDirectionY
        );
    }

    private onSwitchBullet(): void {
        this.bulletManagerNode.emit(CName.INPUT.SWITCH_BULLET);
    }

    private checkValidMove(currentPositionY: number, limit: Vec2): boolean {
        return this.moveDirectionY > 0 && currentPositionY < limit.y ||
            this.moveDirectionY < 0 && currentPositionY > limit.x
    }

    private takeDamage(value: number): void {
        this.isAlive = this.characterController.takeDamage(value);
        if (this.isAlive) {
            return;
        }
        this.characterAnimation.setAnimation(0, CName.ANIMATION.DEATH, false);
        this.scheduleOnce(() => {
            this.roomManager.endRound(ERoundStatus.LOSE);
        }, 4.3);
    }

    public reset() {
        this.isAlive = true;
        this.characterController.reset();
        this.characterAnimation.setAnimation(0, CName.ANIMATION.PORTAL, false);
        this.characterAnimation.changeAnimation(0, CName.ANIMATION.IDLE, 0, true);
        this.unscheduleAllCallbacks();
    }
}