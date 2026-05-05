import { _decorator, Component, Node } from 'cc';
import { mEventEmitter } from '../../Event/mEventEmitter';
import { ButtonManager } from './ButtonManager';
import { CEvent } from '../../Constant/CEvent';
import { EPopupType } from '../../Enum/EType';
import { EButtonEvent } from '../../Enum/EEvent';
import { EGameStatus, ERoundStatus } from '../../Enum/EStatus';
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
        this.node.on(CEvent.BUTTON.BUTTON_EVENT, this.handleButtonEvents, this);

        mEventEmitter.instance.registerEvent(CEvent.LAYER.ENABLE_POPUP, this.showPopup.bind(this), this);
    }

    private showPopup(popupType: EPopupType) {
        this.container.active = true;
        this.popupUINodes[popupType].active = true;
        const alreadyExists = this.activatedNodes.some(item => item === this.popupUINodes[popupType]);
        if (!alreadyExists) {
            this.activatedNodes.push(this.popupUINodes[popupType]);
        }
    }

    private hidePopup(popupType: EPopupType) {
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
                this.hidePopup(EPopupType.PAUSE);
                break;

            case EButtonEvent.OPEN_SETTING:
                this.showPopup(EPopupType.SETTING);
                break;

            case EButtonEvent.CLOSE_SETTING:
                this.hidePopup(EPopupType.SETTING);
                break;

            case EButtonEvent.RESTART:
                mEventEmitter.instance.emit(ERoundStatus.RESTART);
                this.hideAllPopups();
                break;

            case EButtonEvent.QUIT_ROUND:
                mEventEmitter.instance.emit(CEvent.GAME.CHANGE_STATE, EGameStatus.QUIT_ROUND);
                this.hideAllPopups();
                break;

            default:
                break;
        }
    }
}