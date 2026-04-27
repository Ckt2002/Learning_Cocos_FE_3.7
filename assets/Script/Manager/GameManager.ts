import { _decorator, Component } from 'cc';
import { mEventEmitter } from '../Event/mEventEmitter';
import { EGameState } from '../Enum/EGameState';
import { CLayerEvent } from '../Constant/CLayerEvent';
import { CGameEvent } from '../Constant/CGameEvent';
import { EPopup } from '../Enum/EPopup';
const { ccclass } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    public static pauseGame: boolean = false;

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
                this.startRoundState(true);
                break;

            case EGameState.PAUSE_GAME:
                this.pauseGameState(CLayerEvent.ENABLE_POPUP, true);
                break;

            case EGameState.RESUME_GAME:
                this.pauseGameState(CLayerEvent.DISABLE_POPUP, false);
                break;

            case EGameState.QUIT_GAME:
                this.quitGameState();
                break;

            case EGameState.OPEN_SETTING:
                this.settingState(CLayerEvent.ENABLE_POPUP);
                break;

            case EGameState.CLOSE_SETTING:
                this.settingState(CLayerEvent.DISABLE_POPUP);
                break;

            case EGameState.WIN_ROUND:
                console.log("Handling win round");
                this.endRoundState(EPopup.WIN);
                break;

            case EGameState.LOSE_ROUND:
                this.endRoundState(EPopup.LOSE);
                break;

            default:
                break;
        }
    }

    initGameState() {
        mEventEmitter.instance.emit(CLayerEvent.ENABLE_LOBBY);
    }

    startRoundState(isPausing: boolean) {
        GameManager.pauseGame = isPausing;
        mEventEmitter.instance.emit(CLayerEvent.DISABLE_LOBBY);
        mEventEmitter.instance.emit(CLayerEvent.ENABLE_ROOM);
    }

    pauseGameState(layerEvent: string, isPausing: boolean) {
        GameManager.pauseGame = isPausing;
        mEventEmitter.instance.emit(layerEvent, EPopup.PAUSE_GAME);
    }

    quitGameState() {
        mEventEmitter.instance.emit(CLayerEvent.DISABLE_POPUP);
        mEventEmitter.instance.emit(CLayerEvent.DISABLE_ROOM);
        mEventEmitter.instance.emit(CLayerEvent.ENABLE_LOBBY);
    }

    endRoundState(popupType: EPopup) {
        GameManager.pauseGame = true;
        mEventEmitter.instance.emit(CLayerEvent.ENABLE_POPUP, popupType);
    }

    settingState(layerEvent: string) {
        mEventEmitter.instance.emit(layerEvent, EPopup.SETTING);
    }

    protected onDestroy(): void {
        mEventEmitter.instance.removeAllOwnerEvents(this);
        mEventEmitter.instance.destroy();
    }
}