import { _decorator, Component, Node } from 'cc';
import { mEventEmitter } from '../Event/mEventEmitter';
import { CLayerEvent } from '../Constant/CLayerEvent';
import { EPopup } from '../Enum/EPopup';
import { ButtonManager } from './ButtonManager';
import { EButtonEvent } from '../Enum/EButtonEvent';
import { CGameEvent } from '../Constant/CGameEvent';
import { EGameState } from '../Enum/EGameState';
const { ccclass, property } = _decorator;

@ccclass("PopupManager")
export class PopupManager extends Component {
    @property(Node)
    popupNode: Node = null;

    @property([Node])
    popupUINodes: Node[] = [];

    @property({
        type: ButtonManager,
        visible: false,
    })
    buttonManager: ButtonManager = null;

    protected onLoad(): void {
        this.popupNode = this.node.children[0];
        this.buttonManager = this.node.getComponent(ButtonManager);
    }

    protected start(): void {
        this.startInit();
    }

    protected onDestroy(): void {
        mEventEmitter.instance.removeAllOwnerEvents(this);
    }

    private startInit(): void {
        this.registerEvents();
        this.setupButtonManager();
    }

    private setupButtonManager() {
        this.buttonManager.setupTargetNodeEvent(this.node);
    }

    private registerEvents(): void {
        mEventEmitter.instance.registerEvent(CLayerEvent.ENABLE_POPUP, this.enableLayer.bind(this), this);
        mEventEmitter.instance.registerEvent(CLayerEvent.DISABLE_POPUP, this.disableLayer.bind(this), this);

        this.node.on('ButtonEvent', this.popupEventHandler.bind(this), this);
    }

    private enableLayer(popupType: EPopup): void {
        console.log(popupType);
        if (!this.popupNode.active) {
            this.popupNode.active = true;
        }
        this.popupUINodes[popupType].active = true;
    }

    private disableLayer(popupType: EPopup): void {
        this.popupNode.active = false;
        this.popupUINodes[popupType].active = false;
    }

    private popupEventHandler(buttonEvent: EButtonEvent) {
        console.log(buttonEvent);
        switch (buttonEvent) {
            case EButtonEvent.RESUME_GAME:
                mEventEmitter.instance.emit(CGameEvent.CHANGE_STATE, EGameState.RESUME_GAME)
                break;

            default:
                break;
        }
    }
}