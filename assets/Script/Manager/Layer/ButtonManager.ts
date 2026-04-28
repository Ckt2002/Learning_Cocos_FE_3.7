import { _decorator, Component, Node } from 'cc';
import { ButtonController } from '../../UI/Button/ButtonController';
const { ccclass, property } = _decorator;

@ccclass("ButtonManager")
export class ButtonManager extends Component {
    @property([ButtonController])
    buttons: ButtonController[] = [];

    @property(Node)
    private targetNode: Node = null;

    protected onLoad(): void {
        if (this.buttons.length === 0) {
            this.buttons = this.node.getComponentsInChildren(ButtonController);
        }
    }

    protected start(): void {
        for (let controller of this.buttons) {
            controller.setupTargetNode(this.targetNode);
        }
    }
}