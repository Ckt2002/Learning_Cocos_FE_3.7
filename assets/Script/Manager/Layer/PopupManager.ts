import { _decorator, Component, Node, animation } from 'cc';
import { mEventEmitter } from '../../Event/mEventEmitter';
import { CLayerEvent } from '../../Constant/CLayerEvent';
import { EPopup } from '../../Enum/EPopup';
import { EButtonEvent } from '../../Enum/EButtonEvent';
import { CGameEvent } from '../../Constant/CGameEvent';
import { EGameState } from '../../Enum/EGameState';
import { BaseLayerManager } from '../BaseLayerManager';
import { ButtonManager } from './ButtonManager';
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

    protected handleButtonEvents(buttonEvent: EButtonEvent) {
        let gameState: EGameState = EGameState.CLOSE_SETTING;
        switch (buttonEvent) {
            case EButtonEvent.RESUME_ROUND:
                this.hidePopup(EPopup.PAUSE);
                break;

            case EButtonEvent.OPEN_SETTING:
                this.showPopup(EPopup.SETTING);
                break;

            case EButtonEvent.CLOSE_SETTING:
                this.hidePopup(EPopup.SETTING);
                break;

            // case EButtonEvent.RESTART_ROUND:
            //     gameState = EGameState.RESTART_ROUND;
            //     break;

            case EButtonEvent.QUIT_GAME:
                console.log("Quit game");
                break;

            default:
                break;
        }
    }
}