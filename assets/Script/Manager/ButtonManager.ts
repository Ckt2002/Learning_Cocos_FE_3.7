import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import { ButtonController } from "../UI/Button/ButtonController";

@ccclass("ButtonManager")
export class ButtonManager extends Component {
    @property({ type: [ButtonController], visible: false })
    childButtons: ButtonController[] = [];

    private targetNode: Node = null;

    protected onLoad(): void {
        this.childButtons = this.node.getComponentsInChildren(ButtonController);
    }

    protected start(): void {
        this.initStart();
    }

    public setupTargetNodeEvent(target: Node): void {
        this.targetNode = target;
    }

    private initStart() {
        for (let controller of this.childButtons) {
            controller.setupEvent(this.targetNode);
        }
    }
}