import { _decorator, Component, Node, Vec2 } from 'cc';
import { CharacterController } from '../Character/CharacterController';
import { CInputName } from '../Constant/CInputName';
import { CRoundEvent } from '../Constant/CRoundEvent';
import { GameManager } from './GameManager';
import { RoomManager } from './RoomManager';
import { ERoundStatus } from '../Enum/ERoundStatus';
import { CharacterAnimation } from '../Character/CharacterAnimation';
import { CAnimationName } from '../Constant/CAnimationName';
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
        if (GameManager.pauseGame) {
            return;
        }
        this.move(dt);
    }

    protected onDestroy(): void {
        this.node.targetOff(this);
        this.roomManager.node.targetOff(this);
    }

    private registerEvents(): void {
        this.node.on(CInputName.MOVE_UP, this.setDirection, this);
        this.node.on(CInputName.MOVE_DOWN, this.setDirection, this);
        this.node.on(CInputName.STOP_MOVING, this.setDirection, this);
        this.node.on(CInputName.SWITCH_BULLET, this.onSwitchBullet, this);
        this.node.on(CRoundEvent.PLAYER_TAKE_DAMAGE, this.takeDamage, this);

        this.roomManager.node.on(CRoundEvent.INIT_ROUND, this.reset, this);
        this.roomManager.node.on(CRoundEvent.RESET_ROUND, this.reset, this);
    }

    private setDirection(direction: number): void {
        this.moveDirectionY = direction;
    }

    private move(dt: number): void {
        if (!this.isAlive) {
            return;
        }
        if (!this.characterController || this.moveDirectionY === 0) {
            this.characterAnimation.setAnimation(0, CAnimationName.IDLE, true);
            return;
        }

        const characterNode = this.characterController.node;
        const currentPosition = characterNode.position;
        if (!this.checkValidMove(currentPosition.y, this.characterController.limitVertical)) {
            this.characterAnimation.setAnimation(0, CAnimationName.IDLE, true);
            return;
        }

        this.characterAnimation.setAnimation(0, CAnimationName.RUN, true);

        characterNode.setPosition(
            currentPosition.x,
            currentPosition.y + dt * this.characterController.moveSpeed * this.moveDirectionY
        );
    }

    private onSwitchBullet(): void {
        this.bulletManagerNode.emit(CInputName.SWITCH_BULLET);
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
        this.characterAnimation.setAnimation(0, CAnimationName.DEATH, false);
        setTimeout(() => {
            this.roomManager.endRound(ERoundStatus.LOSE);
        }, 3000);
    }

    public reset() {
        this.characterController.reset();
        this.characterAnimation.setAnimation(0, CAnimationName.PORTAL, false);
        this.characterAnimation.changeAnimation(0, CAnimationName.IDLE, 0, true);
    }
}