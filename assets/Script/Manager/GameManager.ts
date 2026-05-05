import { _decorator, Component, game, native } from 'cc';
import { mEventEmitter } from '../Event/mEventEmitter';
import { EGameStatus } from '../Enum/EStatus';
import { CEvent } from '../Constant/CEvent';
import { CName } from '../Constant/CName';
const { ccclass } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    protected onLoad(): void {
        mEventEmitter.instance = new mEventEmitter();
    }

    protected start(): void {
        mEventEmitter.instance.registerEvent(CEvent.GAME.CHANGE_STATE, this.changeGameState.bind(this), this);
    }

    public changeGameState(gameState: EGameStatus): void {
        switch (gameState) {
            case EGameStatus.START_ROUND:
                mEventEmitter.instance.emit(CEvent.SCENE.CHANGE_SCENE, CName.SCENE.ROOM);
                break;

            case EGameStatus.QUIT_ROUND:
                mEventEmitter.instance.emit(CEvent.SCENE.CHANGE_SCENE, CName.SCENE.HOME);
                break;

            case EGameStatus.QUIT_GAME:
                game.end();
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