import { _decorator, Component, Node } from 'cc';
import { CharacterController } from '../Character/CharacterController';
const { ccclass, property } = _decorator;

@ccclass('CharacterManager')
export class CharacterManager extends Component {

    @property(CharacterController)
    currentCharacter: CharacterController;

    protected onLoad(): void {
        this.node.on('MOVE_UP', this.moveUp, this);
        this.node.on('MOVE_DOWN', this.moveDown, this);
    }

    protected onDestroy(): void {
        this.node.off('MOVE_UP', this.moveUp, this);
        this.node.off('MOVE_DOWN', this.moveDown, this);
    }

    moveUp() {
        console.log("Up");
    }

    moveDown() {
        console.log("Down");
    }
}