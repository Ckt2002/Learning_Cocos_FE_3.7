import { _decorator, Component } from 'cc';
import { mEventEmitter } from '../Event/mEventEmitter';
import { EGameState } from '../Enum/EGameState';
import { CGameEvent } from '../Constant/CGameEvent';
const { ccclass } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    public static pauseGame: boolean = false;

    protected onLoad(): void {
        mEventEmitter.instance = new mEventEmitter();
    }

    protected start(): void {
        mEventEmitter.instance.registerEvent(CGameEvent.CHANGE_STATE, this.changeGameState.bind(this), this);
    }

    public changeGameState(gameState: EGameState): void {
        switch (gameState) {
            case EGameState.START_ROUND:
                mEventEmitter.instance.emit('CHANGE_SCENE', "Game");
                break;

            case EGameState.QUIT_ROUND:
                mEventEmitter.instance.emit('CHANGE_SCENE', "Home");
                break;
            default:
                break;
        }
    }

    protected onDestroy(): void {
        mEventEmitter.instance.removeAllOwnerEvents(this);
        mEventEmitter.instance.destroy();
    }
}