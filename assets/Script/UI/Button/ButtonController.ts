import { _decorator, Button, Component, Enum, EventHandler, Node } from 'cc';
import { EButtonEvent } from '../../Enum/EButtonEvent';
const { ccclass, property } = _decorator;

@ccclass('ButtonController')
export class ButtonController extends Component {
    @property({ type: Enum(EButtonEvent) })
    buttonEventType: EButtonEvent;

    targetNode: Node = null;
    buttonEvent: Function = null;
    button: Button = null;

    protected onLoad(): void {
        this.button = this.node.getComponent(Button);
    }

    public setupEvent(targetNode: Node, event: Function) {
        this.targetNode = targetNode;
        this.buttonEvent = event;
    }

    public buttonAction() {
        this.targetNode.emit("ButtonEvent", this.buttonEventType);
    }
}