import { _decorator, Component, Enum } from 'cc';
import { mEventEmitter } from '../../Event/mEventEmitter';
import { CLayerEvent } from '../../Constant/CLayerEvent';
import { EButtonEvent } from '../../Enum/EButtonEvent';
import { EGameState } from '../../Enum/EGameState';
import { CGameEvent } from '../../Constant/CGameEvent';
import { BaseLayerManager } from '../BaseLayerManager';
import { ERoundStatus } from '../../Enum/ERoundStatus';
import { CRoundEvent } from '../../Constant/CRoundEvent';
import { ButtonManager } from './ButtonManager';
import { EPopup } from '../../Enum/EPopup';

const { ccclass, property } = _decorator;

@ccclass("RoomManager")
export class RoomManager extends Component {
    @property(ButtonManager)
    protected buttonManager: ButtonManager = null;

    protected start(): void {
        this.init();
    }

    protected init(): void {
        this.node.on("ButtonEvent", this.handleButtonEvents, this);
    }

    protected handleButtonEvents(buttonEvent: EButtonEvent) {
        switch (buttonEvent) {
            case EButtonEvent.PAUSE_ROUND:
                this.node.emit('PAUSE_ROUND');
                mEventEmitter.instance.emit('ENABLE_POPUP', EPopup.PAUSE);
                break;

            default:
                break;
        }
    }

    // protected registerEvents(): void {
    //     mEventEmitter.instance.registerEvent(CLayerEvent.INIT_ROOM, this.initRound.bind(this), this);
    // }

    // public endRound(status: ERoundStatus) {
    //     switch (status) {
    //         case ERoundStatus.WIN:
    //             mEventEmitter.instance.emit(CGameEvent.CHANGE_STATE, EGameState.WIN_ROUND);
    //             break;

    //         case ERoundStatus.LOSE:
    //             mEventEmitter.instance.emit(CGameEvent.CHANGE_STATE, EGameState.LOSE_ROUND);
    //             break;

    //         default:
    //             break;
    //     }
    // }
}