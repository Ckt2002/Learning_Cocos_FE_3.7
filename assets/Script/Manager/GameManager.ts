import { _decorator, Component, Node } from 'cc';
import { mEventEmitter } from '../Event/mEventEmitter';
import { EGameState } from '../Enum/EGameState';
import { CLayerEvent } from '../Constant/CLayerEvent';
import { CGameEvent } from '../Constant/CGameEvent';
import { EPopup } from '../Enum/EPopup';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    protected onLoad(): void {
        mEventEmitter.instance = new mEventEmitter();
    }

    protected start(): void {
        this.startInit();
        mEventEmitter.instance.emit(CGameEvent.CHANGE_STATE, EGameState.START_GAME);
    }

    private startInit() {
        this.registerEvents();
        mEventEmitter.instance.emit(CGameEvent.CHANGE_STATE, EGameState.START_GAME);
    }

    private registerEvents() {
        mEventEmitter.instance.registerEvent(CGameEvent.CHANGE_STATE, this.changeGameState.bind(this), this);
    }

    public changeGameState(gameState: EGameState): void {
        switch (gameState) {
            case EGameState.START_GAME:
                this.startGameState();
                break;

            case EGameState.START_ROUND:
                this.startRoundState()
                break;

            case EGameState.PAUSE_GAME:
                this.pauseGameState();
                break;

            default:
                break;
        }
    }

    startGameState() {
        mEventEmitter.instance.emit(CLayerEvent.ENABLE_LOBBY);
    }

    startRoundState() {
        mEventEmitter.instance.emit(CLayerEvent.DISABLE_LOBBY);
        mEventEmitter.instance.emit(CLayerEvent.ENABLE_ROOM);
    }

    endRoundState() {
        mEventEmitter.instance.emit(CLayerEvent.DISABLE_ROOM);
        mEventEmitter.instance.emit(CLayerEvent.ENABLE_LOBBY);
    }

    pauseGameState() {
        mEventEmitter.instance.emit(CLayerEvent.ENABLE_POPUP, EPopup.PAUSE_GAME);
    }

    protected onDestroy(): void {
        mEventEmitter.instance.removeAllOwnerEvents(this);
        mEventEmitter.instance.destroy();
    }
}