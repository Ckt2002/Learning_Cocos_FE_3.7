import { _decorator } from 'cc';
import { mEventEmitter } from '../Event/mEventEmitter';
import { CLayerEvent } from '../Constant/CLayerEvent';
import { EButtonEvent } from '../Enum/EButtonEvent';
import { EGameState } from '../Enum/EGameState';
import { CGameEvent } from '../Constant/CGameEvent';
import { BaseLayerManager } from './BaseLayerManager';

const { ccclass, property } = _decorator;

@ccclass("RoomManager")
export class RoomManager extends BaseLayerManager<void> {

    protected registerEvents(): void {
        mEventEmitter.instance.registerEvent(CLayerEvent.ENABLE_ROOM, this.enableContainer.bind(this), this);
        mEventEmitter.instance.registerEvent(CLayerEvent.DISABLE_ROOM, this.disableContainer.bind(this), this);

        super.registerEvents();
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
}