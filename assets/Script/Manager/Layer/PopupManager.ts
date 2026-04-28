import { _decorator, Component, Node } from 'cc';
import { mEventEmitter } from '../../Event/mEventEmitter';
import { EPopup } from '../../Enum/EPopup';
import { EButtonEvent } from '../../Enum/EButtonEvent';
import { ButtonManager } from './ButtonManager';
import { ERoundStatus } from '../../Enum/ERoundStatus';
import { EGameState } from '../../Enum/EGameState';
import { CGameEvent } from '../../Constant/CGameEvent';
const { ccclass, property } = _decorator;

@ccclass("PopupManager")
export class PopupManager extends Component {

    @property(Node)
    protected container: Node = null;

    @property([Node])
    popupUINodes: Node[] = [];

    @property({ type: ButtonManager })
    protected buttonManager: ButtonManager = null;

    private activatedNodes: Node[] = [];

    protected onLoad(): void {
        this.activatedNodes = [];
    }

    protected start(): void {
        this.init();
    }

    protected onDestroy(): void {
        mEventEmitter.instance.removeAllOwnerEvents(this);
    }

    private init(): void {
        this.node.on("ButtonEvent", this.handleButtonEvents, this);

        mEventEmitter.instance.registerEvent('ENABLE_POPUP', this.showPopup.bind(this), this);
    }

    private showPopup(popupType: EPopup) {
        this.container.active = true;
        this.popupUINodes[popupType].active = true;
        const alreadyExists = this.activatedNodes.some(item => item === this.popupUINodes[popupType]);
        if (!alreadyExists) {
            this.activatedNodes.push(this.popupUINodes[popupType]);
        }
    }

    private hidePopup(popupType: EPopup) {
        this.popupUINodes[popupType].active = false;
        const index = this.activatedNodes.indexOf(this.popupUINodes[popupType], 0);
        this.activatedNodes.splice(index, 1);
        if (this.activatedNodes.length === 0) {
            this.container.active = false;
        }
    }

    private hideAllPopups() {
        for (let popup of this.activatedNodes) {
            popup.active = false;
        }
        this.activatedNodes = [];
        this.container.active = false;
    }

    protected handleButtonEvents(buttonEvent: EButtonEvent) {
        switch (buttonEvent) {
            case EButtonEvent.RESUME:
                mEventEmitter.instance.emit(ERoundStatus.RESUME);
                this.hidePopup(EPopup.PAUSE);
                break;

            case EButtonEvent.OPEN_SETTING:
                this.showPopup(EPopup.SETTING);
                break;

            case EButtonEvent.CLOSE_SETTING:
                this.hidePopup(EPopup.SETTING);
                break;

            case EButtonEvent.RESTART:
                mEventEmitter.instance.emit(ERoundStatus.RESTART);
                this.hideAllPopups();
                break;

            case EButtonEvent.QUIT:
                mEventEmitter.instance.emit(CGameEvent.CHANGE_STATE, EGameState.QUIT_ROUND);
                this.hideAllPopups();
                break;

            default:
                break;
        }
    }
}