import { _decorator, Component } from 'cc';
import { mEventEmitter } from '../../Event/mEventEmitter';
import { ButtonManager } from './ButtonManager';
import { GameManager } from '../GameManager';
import { CEvent } from '../../Constant/CEvent';
import { EButtonEvent } from '../../Enum/EEvent';
import { EPopupType } from '../../Enum/EType';
import { ERoundStatus } from '../../Enum/EStatus';

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

        this.node.emit(CEvent.ROUND.INIT_ROUND);
    }

    protected handleButtonEvents(buttonEvent: EButtonEvent) {
        switch (buttonEvent) {
            case EButtonEvent.PAUSE:
                this.pause();
                // Fix event name here
                mEventEmitter.instance.emit('ENABLE_POPUP', EPopupType.PAUSE);
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
        this.node.emit(CEvent.ROUND.RESET_ROUND);
    }

    public endRound(status: ERoundStatus) {
        switch (status) {
            case ERoundStatus.WIN:
                mEventEmitter.instance.emit('ENABLE_POPUP', EPopupType.WIN);
                GameManager.pauseGame = true;
                break;

            case ERoundStatus.LOSE:
                mEventEmitter.instance.emit('ENABLE_POPUP', EPopupType.LOSE);
                GameManager.pauseGame = true;
                break;

            default:
                break;
        }
    }
}