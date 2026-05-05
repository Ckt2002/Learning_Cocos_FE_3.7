import { _decorator, Component } from 'cc';
import { mEventEmitter } from '../Event/mEventEmitter';
import { EGameStatus } from '../Enum/EStatus';
import { CEvent } from '../Constant/CEvent';
const { ccclass } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    public static pauseGame: boolean = false;

    protected onLoad(): void {
        mEventEmitter.instance = new mEventEmitter();
    }

    protected start(): void {
        mEventEmitter.instance.registerEvent(CEvent.GAME.CHANGE_STATE, this.changeGameState.bind(this), this);
    }

    public changeGameState(gameState: EGameStatus): void {
        switch (gameState) {
            case EGameStatus.START_ROUND:
                mEventEmitter.instance.emit('CHANGE_SCENE', "Game");
                break;

            case EGameStatus.QUIT_ROUND:
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