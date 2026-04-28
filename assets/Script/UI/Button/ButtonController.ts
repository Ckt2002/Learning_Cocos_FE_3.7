import { _decorator, Component, Enum, Node } from 'cc';
import { EButtonEvent } from '../../Enum/EButtonEvent';
const { ccclass, property } = _decorator;

@ccclass('ButtonController')
export class ButtonController extends Component {
    @property({ type: Enum(EButtonEvent) })
    buttonEventType: EButtonEvent;

    @property({ visible: false })
    private targetNode: Node = null;

    public setupTargetNode(targetNode: Node) {
        this.targetNode = targetNode;
    }

    public buttonAction() {
        this.targetNode.emit("ButtonEvent", this.buttonEventType);
    }
}