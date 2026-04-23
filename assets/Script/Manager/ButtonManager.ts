import { _decorator, Button, Component, Enum, EventHandler, Node } from 'cc';
const { ccclass, property } = _decorator;
import { ButtonController } from "../UI/Button/ButtonController";

@ccclass("ButtonManager")
export class ButtonManager extends Component {
    @property({ type: [ButtonController] })
    childButtons: ButtonController[] = [];

    private targetNode: Node = null;
    private event: Function = null;

    protected onLoad(): void {
        this.childButtons = this.node.getComponentsInChildren(ButtonController);
    }

    protected start(): void {
        this.initStart();
    }

    public setupTargetNodeEvent(target: Node, event: Function): void {
        this.targetNode = target;
        this.event = event;
    }

    private initStart() {
        for (let controller of this.childButtons) {
            controller.setupEvent(this.targetNode, this.event);
        }
    }
}