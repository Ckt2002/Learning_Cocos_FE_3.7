import { _decorator, Component } from 'cc';
import { mEventEmitter } from '../../Event/mEventEmitter';
import { EButtonEvent } from '../../Enum/EButtonEvent';
import { ERoundStatus } from '../../Enum/ERoundStatus';
import { CRoundEvent } from '../../Constant/CRoundEvent';
import { ButtonManager } from './ButtonManager';
import { EPopup } from '../../Enum/EPopup';
import { GameManager } from '../GameManager';

const { ccclass, property } = _decorator;

@ccclass("RoomManager")
export class RoomManager extends Component {
    @property(ButtonManager)
    protected buttonManager: ButtonManager = null;

    protected start(): void {
        this.init();
    }

    protected onDestroy(): void {
        mEventEmitter.instance.removeAllOwnerEvents(this);
        this.node.targetOff(this);
    }

    protected init(): void {
        this.node.on("ButtonEvent", this.handleButtonEvents, this);

        mEventEmitter.instance.registerEvent(ERoundStatus.RESUME, this.resume.bind(this), this);
        mEventEmitter.instance.registerEvent(ERoundStatus.RESTART, this.restart.bind(this), this);

        this.node.emit(CRoundEvent.INIT_ROUND);
    }

    protected handleButtonEvents(buttonEvent: EButtonEvent) {
        switch (buttonEvent) {
            case EButtonEvent.PAUSE:
                this.pause();
                mEventEmitter.instance.emit('ENABLE_POPUP', EPopup.PAUSE);
                break;
            default:
                break;
        }
    }

    public pause() {
        this.node.emit('PAUSE');
    }

    public resume() {
        this.node.emit('RESUME');
    }

    public restart() {
        this.node.emit(CRoundEvent.RESET_ROUND);
    }

    public endRound(status: ERoundStatus) {
        switch (status) {
            case ERoundStatus.WIN:
                mEventEmitter.instance.emit('ENABLE_POPUP', EPopup.WIN);
                GameManager.pauseGame = true;
                break;

            case ERoundStatus.LOSE:
                mEventEmitter.instance.emit('ENABLE_POPUP', EPopup.LOSE);
                GameManager.pauseGame = true;
                break;

            default:
                break;
        }
    }
}