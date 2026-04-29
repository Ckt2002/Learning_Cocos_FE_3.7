import { _decorator, Component, Enum, Node } from 'cc';
import { EButtonEvent } from '../../Enum/EButtonEvent';
import { mEventEmitter } from '../../Event/mEventEmitter';
import { CAudioEvent } from '../../Constant/CAudioEvent';
import { EAudioClipType } from '../../Enum/EAudioClipType';
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
        mEventEmitter.instance.emit(CAudioEvent.PLAY_SFX, EAudioClipType.CLICK);
        this.targetNode.emit("ButtonEvent", this.buttonEventType);
    }
}