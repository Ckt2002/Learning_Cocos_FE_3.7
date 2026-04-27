import { _decorator, Enum } from 'cc';
import { mEventEmitter } from '../Event/mEventEmitter';
import { CLayerEvent } from '../Constant/CLayerEvent';
import { EButtonEvent } from '../Enum/EButtonEvent';
import { EGameState } from '../Enum/EGameState';
import { CGameEvent } from '../Constant/CGameEvent';
import { BaseLayerManager } from './BaseLayerManager';
import { ERoundStatus } from '../Enum/ERoundStatus';
import { CRoundEvent } from '../Constant/CRoundEvent';

const { ccclass } = _decorator;

@ccclass("RoomManager")
export class RoomManager extends BaseLayerManager<void> {
    protected registerEvents(): void {
        mEventEmitter.instance.registerEvent(CLayerEvent.ENABLE_ROOM, this.enableContainer.bind(this), this);
        mEventEmitter.instance.registerEvent(CLayerEvent.DISABLE_ROOM, this.disableContainer.bind(this), this);

        super.registerEvents();
    }

    protected enableContainer(param?: void): void {
        super.enableContainer(param);
        this.node.emit(CRoundEvent.INIT_ROUND);
    }

    protected layerEventHandler(buttonEvent: EButtonEvent) {
        switch (buttonEvent) {
            case EButtonEvent.PAUSE_GAME:
                mEventEmitter.instance.emit(CGameEvent.CHANGE_STATE, EGameState.PAUSE_GAME);
                break;

            default:
                break;
        }
    }

    public endRound(status: ERoundStatus) {
        switch (status) {
            case ERoundStatus.WIN:
                mEventEmitter.instance.emit(CGameEvent.CHANGE_STATE, EGameState.WIN_ROUND);
                break;

            case ERoundStatus.LOSE:
                mEventEmitter.instance.emit(CGameEvent.CHANGE_STATE, EGameState.LOSE_ROUND);
                break;

            default:
                break;
        }
    }
}