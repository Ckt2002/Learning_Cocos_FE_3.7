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
    lobbyNodes: Node[] = [];

    @property([ButtonManager])
    buttonManagers: ButtonManager[] = [];

    protected onLoad(): void {
        this.lobbyNode = this.node.children[0];
        this.buttonManagers = this.node.getComponentsInChildren(ButtonManager);
    }

    protected start(): void {
        this.startInit();
    }

    private startInit(): void {
        this.registerEvents();
        this.setupButtonManagers();
    }

    private setupButtonManagers() {
        for (let manager of this.buttonManagers) {
            manager.setupTargetNodeEvent(this.node, this.lobbyEventHandler.bind(this));
        }
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

    protected onDestroy(): void {
        mEventEmitter.instance.removeAllOwnerEvents(this);
    }

    private lobbyEventHandler(buttonEvent: EButtonEvent) {
        switch (buttonEvent) {
            case EButtonEvent.START_ROUND:
                mEventEmitter.instance.emit(CGameEvent.CHANGE_STATE, EGameState.START_ROUND);
                break;

            default:
                for (let index = 0; index < this.lobbyNodes.length; index++) {
                    this.lobbyNodes[index].active = buttonEvent === index;
                }
                break;
        }
    }
}