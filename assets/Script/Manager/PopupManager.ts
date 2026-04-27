import { _decorator, Node } from 'cc';
import { mEventEmitter } from '../Event/mEventEmitter';
import { CLayerEvent } from '../Constant/CLayerEvent';
import { EPopup } from '../Enum/EPopup';
import { EButtonEvent } from '../Enum/EButtonEvent';
import { CGameEvent } from '../Constant/CGameEvent';
import { EGameState } from '../Enum/EGameState';
import { BaseLayerManager } from './BaseLayerManager';
const { ccclass, property } = _decorator;

@ccclass("PopupManager")
export class PopupManager extends BaseLayerManager<EPopup> {

    @property([Node])
    popupUINodes: Node[] = [];

    private activatedNodes: Node[] = [];

    protected onLoad(): void {
        super.onLoad();
        this.activatedNodes = [];
    }

    protected registerEvents(): void {
        mEventEmitter.instance.registerEvent(CLayerEvent.ENABLE_POPUP, this.enableContainer.bind(this), this);
        mEventEmitter.instance.registerEvent(CLayerEvent.DISABLE_POPUP, this.disableContainer.bind(this), this);

        super.registerEvents();
    }

    protected enableContainer(popupType?: EPopup): void {
        super.enableContainer(popupType);
        this.popupUINodes[popupType].active = true;
        this.activatedNodes.push(this.popupUINodes[popupType]);
    }

    protected disableContainer(popupType?: EPopup): void {
        if (!popupType || this.activatedNodes.length <= 1) {
            this.container.active = false;
        }

        if (!popupType) {
            for (let node of this.activatedNodes) {
                node.active = false;
            }
            this.activatedNodes = [];
            return;
        }

        this.popupUINodes[popupType].active = false;
        const index = this.activatedNodes.indexOf(this.popupUINodes[popupType], 0);
        this.activatedNodes.splice(index, 1);
    }

    protected layerEventHandler(buttonEvent: EButtonEvent) {
        let gameState: EGameState = EGameState.CLOSE_SETTING;
        switch (buttonEvent) {
            case EButtonEvent.RESUME_ROUND:
                gameState = EGameState.RESUME_ROUND;
                break;

            case EButtonEvent.OPEN_SETTING:
                gameState = EGameState.OPEN_SETTING;
                break;

            case EButtonEvent.CLOSE_SETTING:
                gameState = EGameState.CLOSE_SETTING;
                break;

            case EButtonEvent.RESTART_ROUND:
                gameState = EGameState.RESTART_ROUND;
                break;

            case EButtonEvent.QUIT_GAME:
                gameState = EGameState.QUIT_GAME;
                break;

            default:
                break;
        }
        mEventEmitter.instance.emit(CGameEvent.CHANGE_STATE, gameState);
    }
}