import { _decorator, Component, Node, Vec2, Vec3 } from 'cc';
import { CharacterController } from '../Character/CharacterController';
import { CInputName } from '../Constant/CInputName';
const { ccclass, property } = _decorator;

@ccclass('CharacterManager')
export class CharacterManager extends Component {

    @property(CharacterController)
    characterController: CharacterController;

    private moveDirectionY: number = 0;

    protected onLoad(): void {
        this.node.on(CInputName.MOVE_UP, this.setDirection, this);
        this.node.on(CInputName.MOVE_DOWN, this.setDirection, this);
        this.node.on(CInputName.STOP_MOVING, this.setDirection, this);
    }

    protected update(dt: number): void {
        this.move(dt);
    }

    protected onDestroy(): void {
        this.node.off(CInputName.MOVE_UP, this.setDirection, this);
        this.node.off(CInputName.MOVE_DOWN, this.setDirection, this);
        this.node.off(CInputName.STOP_MOVING, this.setDirection, this);
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
        if (!this.validMove(currentPosition.y, this.characterController.limitVertical)) {
            return;
        }

        characterNode.setPosition(
            currentPosition.x,
            currentPosition.y + dt * this.characterController.moveSpeed * this.moveDirectionY
        );
    }

    private validMove(currentPositionY: number, limit: Vec2) {
        return this.moveDirectionY > 0 && currentPositionY < limit.y ||
            this.moveDirectionY < 0 && currentPositionY > limit.x
    }
}