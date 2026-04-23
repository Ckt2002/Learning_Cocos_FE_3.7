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
                this.initGameState();
                break;

            case EGameState.START_ROUND:
                this.startGameState()
                break;

            case EGameState.PAUSE_GAME:
                this.pauseGameState();
                break;

            case EGameState.RESUME_GAME:
                console.log("RESUME");
                this.resumeGameState();
                break;

            default:
                break;
        }
    }

    initGameState() {
        mEventEmitter.instance.emit(CLayerEvent.ENABLE_LOBBY);
    }

    startGameState() {
        mEventEmitter.instance.emit(CLayerEvent.DISABLE_LOBBY);
        mEventEmitter.instance.emit(CLayerEvent.ENABLE_ROOM);
    }

    pauseGameState() {
        mEventEmitter.instance.emit(CLayerEvent.ENABLE_POPUP, EPopup.PAUSE_GAME);
        // Call event to stop all game characters actions
    }

    resumeGameState() {
        mEventEmitter.instance.emit(CLayerEvent.DISABLE_POPUP, EPopup.PAUSE_GAME);
        // Call event to continue all game characters actions
    }

    endGameState() {
        mEventEmitter.instance.emit(CLayerEvent.DISABLE_ROOM);
        mEventEmitter.instance.emit(CLayerEvent.ENABLE_LOBBY);
    }

    protected onDestroy(): void {
        mEventEmitter.instance.removeAllOwnerEvents(this);
        mEventEmitter.instance.destroy();
    }
}