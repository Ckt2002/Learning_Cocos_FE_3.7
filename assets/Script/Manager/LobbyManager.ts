import { _decorator, Component, Node } from 'cc';
import { mEventEmitter } from '../Event/mEventEmitter';
import { CLayerEvent } from '../Constant/CLayerEvent';
import { EButtonEvent } from '../Enum/EButtonEvent';
import { EGameState } from '../Enum/EGameState';
import { CGameEvent } from '../Constant/CGameEvent';
import { ButtonManager } from './ButtonManager';
const { ccclass, property } = _decorator;

@ccclass('LobbyManager')
export class LobbyManager extends Component {

    @property(Node)
    lobbyNode: Node = null;

    @property([Node])
    lobbyUINodes: Node[] = [];

    @property({
        type: ButtonManager,
        visible: false,
    })
    buttonManager: ButtonManager = null;

    protected onLoad(): void {
        this.lobbyNode = this.node.children[0];
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
        mEventEmitter.instance.registerEvent(CLayerEvent.ENABLE_LOBBY, this.enableLayer.bind(this), this);
        mEventEmitter.instance.registerEvent(CLayerEvent.DISABLE_LOBBY, this.disableLayer.bind(this), this);

        this.node.on("ButtonEvent", this.lobbyEventHandler.bind(this), this);
    }

    private enableLayer(): void {
        this.lobbyNode.active = true;
    }

    private disableLayer(): void {
        this.lobbyNode.active = false;
    }

    private lobbyEventHandler(buttonEvent: EButtonEvent) {
        switch (buttonEvent) {
            case EButtonEvent.START_ROUND:
                mEventEmitter.instance.emit(CGameEvent.CHANGE_STATE, EGameState.START_ROUND);
                break;

            default:
                for (let index = 0; index < this.lobbyUINodes.length; index++) {
                    this.lobbyUINodes[index].active = buttonEvent === index;
                }
                break;
        }
    }
}