import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerMovement')
export class PlayerMovement extends Component {
    private playerNode: Node = null;
    private moveDirection: number = 0;

    protected onLoad(): void {
        this.node.on('MOVE_UP', this.setMove, this);
        this.node.on('MOVE_DOWN', this.setMove, this);
        this.node.on('STOP', this.setMove, this);
    }

    protected update(dt: number): void {
        this.move(dt);
    }

    protected onDestroy(): void {
        this.node.off('MOVE_UP', this.setMove, this);
        this.node.off('MOVE_DOWN', this.setMove, this);
        this.node.off('STOP', this.setMove, this);
    }

    private setMove(direction: number): void {
        this.moveDirection = direction;
    }

    private move(dt: number) {
        if (!this.playerNode || this.moveDirection === 0) {
            return;
        }

        const currentPosition = this.playerNode.position;
        this.playerNode.setPosition(currentPosition.x + dt * 100, currentPosition.y);
    }
}