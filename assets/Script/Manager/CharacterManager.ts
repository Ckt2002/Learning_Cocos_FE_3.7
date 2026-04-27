import { _decorator, Component, Node, Vec2, Vec3 } from 'cc';
import { CharacterController } from '../Character/CharacterController';
import { CInputName } from '../Constant/CInputName';
import { BulletManager } from './BulletManager';
import { CRoundEvent } from '../Constant/CRoundEvent';
const { ccclass, property } = _decorator;

@ccclass('CharacterManager')
export class CharacterManager extends Component {
    public static instance: CharacterManager = null;

    @property(CharacterController)
    characterController: CharacterController;

    private moveDirectionY: number = 0;
    private bulletNode: Node = null;

    protected onLoad(): void {
        if (!CharacterManager.instance) {
            CharacterManager.instance = this;
        }

        this.node.on(CInputName.MOVE_UP, this.setDirection, this);
        this.node.on(CInputName.MOVE_DOWN, this.setDirection, this);
        this.node.on(CInputName.STOP_MOVING, this.setDirection, this);
        this.node.on(CInputName.SWITCH_BULLET, this.onSwitchBullet, this);
        this.node.on(CRoundEvent.PLAYER_TAKE_DAMAGE, this.takeDamage, this);
    }

    protected start(): void {
        this.bulletNode = BulletManager.instance.node;
    }

    protected update(dt: number): void {
        this.move(dt);
    }

    protected onDestroy(): void {
        this.node.off(CInputName.MOVE_UP, this.setDirection, this);
        this.node.off(CInputName.MOVE_DOWN, this.setDirection, this);
        this.node.off(CInputName.STOP_MOVING, this.setDirection, this);
        this.node.off(CInputName.SWITCH_BULLET, this.onSwitchBullet, this);
        this.node.off(CRoundEvent.PLAYER_TAKE_DAMAGE, this.takeDamage, this);
    }

    private setDirection(direction: number): void {
        this.moveDirectionY = direction;
    }

    private move(dt: number) {
        if (!this.characterController || this.moveDirectionY === 0) {
            return;
        }

        const characterNode = this.characterController.node;
        const currentPosition = characterNode.position;
        if (!this.checkValidMove(currentPosition.y, this.characterController.limitVertical)) {
            return;
        }

        characterNode.setPosition(
            currentPosition.x,
            currentPosition.y + dt * this.characterController.moveSpeed * this.moveDirectionY
        );
    }

    private onSwitchBullet() {
        this.bulletNode.emit(CInputName.SWITCH_BULLET);
    }

    private checkValidMove(currentPositionY: number, limit: Vec2) {
        return this.moveDirectionY > 0 && currentPositionY < limit.y ||
            this.moveDirectionY < 0 && currentPositionY > limit.x
    }

    private takeDamage(value: number) {
        console.log('Damage taking:', value);
        this.characterController.takeDamage(value);
    }
}