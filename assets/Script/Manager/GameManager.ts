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
                this.startGameState()
                break;

            case EGameState.PAUSE_GAME:
                this.pauseGameState();
                break;

            case EGameState.RESUME_GAME:
                this.resumeGameState();
                break;

            case EGameState.QUIT_GAME:
                this.quitGameState();
                break;

            case EGameState.OPEN_SETTING:
                this.openSettingState();
                break;

            case EGameState.CLOSE_SETTING:
                this.closeSettingState();
                break;

            default:
                break;
        }
    }

    initGameState() {
        GameManager.pauseGame = false;
        mEventEmitter.instance.emit(CLayerEvent.ENABLE_LOBBY);
    }

    startGameState() {
        GameManager.pauseGame = false;
        mEventEmitter.instance.emit(CLayerEvent.DISABLE_LOBBY);
        mEventEmitter.instance.emit(CLayerEvent.ENABLE_ROOM);
    }

    pauseGameState() {
        GameManager.pauseGame = true;
        mEventEmitter.instance.emit(CLayerEvent.ENABLE_POPUP, EPopup.PAUSE_GAME);
        // Call event to stop all game characters actions
    }

    resumeGameState() {
        GameManager.pauseGame = false;
        mEventEmitter.instance.emit(CLayerEvent.DISABLE_POPUP, EPopup.PAUSE_GAME);
        // Call event to continue all game characters actions
    }

    quitGameState() {
        mEventEmitter.instance.emit(CLayerEvent.DISABLE_POPUP);
        mEventEmitter.instance.emit(CLayerEvent.DISABLE_ROOM);
        mEventEmitter.instance.emit(CLayerEvent.ENABLE_LOBBY);
    }

    openSettingState() {
        mEventEmitter.instance.emit(CLayerEvent.ENABLE_POPUP, EPopup.SETTING);
    }

    closeSettingState() {
        mEventEmitter.instance.emit(CLayerEvent.DISABLE_POPUP, EPopup.SETTING);
    }

    protected onDestroy(): void {
        mEventEmitter.instance.removeAllOwnerEvents(this);
        mEventEmitter.instance.destroy();
    }
}