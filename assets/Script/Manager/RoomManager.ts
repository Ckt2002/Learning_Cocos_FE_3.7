import { _decorator, Component, Node } from 'cc';
import { mEventEmitter } from '../Event/mEventEmitter';
import { CLayerEvent } from '../Constant/CLayerEvent';
import { ButtonManager } from './ButtonManager';
import { EButtonEvent } from '../Enum/EButtonEvent';
import { EGameState } from '../Enum/EGameState';
import { CGameEvent } from '../Constant/CGameEvent';

const { ccclass, property } = _decorator;

@ccclass("RoomManager")
export class RoomManager extends Component {
    @property(Node)
    roomNode: Node = null;

    @property({
        type: ButtonManager,
        visible: false,
    })
    buttonManager: ButtonManager = null;

    protected onLoad(): void {
        this.roomNode = this.node.children[0];
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
        mEventEmitter.instance.registerEvent(CLayerEvent.ENABLE_ROOM, this.enableLayer.bind(this), this);
        mEventEmitter.instance.registerEvent(CLayerEvent.DISABLE_ROOM, this.disableLayer.bind(this), this);

        this.node.on('ButtonEvent', this.roomEventHandler.bind(this), this);
    }

    private enableLayer(): void {
        this.roomNode.active = true;
    }

    private disableLayer(): void {
        this.roomNode.active = false;
    }

    private roomEventHandler(buttonEvent: EButtonEvent) {
        switch (buttonEvent) {
            case EButtonEvent.PAUSE_GAME:
                mEventEmitter.instance.emit(CGameEvent.CHANGE_STATE, EGameState.PAUSE_GAME);
                break;

            default:
                break;
        }
    }
}