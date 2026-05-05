import { _decorator, Component, Enum, Node } from 'cc';
import { CEvent } from '../../Constant/CEvent';
import { mEventEmitter } from '../../Event/mEventEmitter';
import { EButtonEvent } from '../../Enum/EEvent';
import { EAudioClipType } from '../../Enum/EType';
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
        mEventEmitter.instance.emit(CEvent.AUDIO.PLAY_SFX, EAudioClipType.CLICK);
        this.targetNode.emit("ButtonEvent", this.buttonEventType);
    }
}