import { _decorator, Component, Node } from 'cc';
import { mEventEmitter } from '../../Event/mEventEmitter';
import { ButtonManager } from './ButtonManager';
import { CEvent } from '../../Constant/CEvent';
import { EPopupType } from '../../Enum/EType';
import { EGameStatus } from '../../Enum/EStatus';
import { EButtonEvent } from '../../Enum/EEvent';
const { ccclass, property } = _decorator;

@ccclass('HomeManager')
export class HomeManager extends Component {

    @property(ButtonManager)
    protected buttonManager: ButtonManager = null;

    @property([Node])
    homeUINodes: Node[] = [];

    protected start(): void {
        this.init();
    }

    protected init(): void {
        this.node.on("ButtonEvent", this.handleButtonEvents, this);
    }

    protected handleButtonEvents(buttonEvent: EButtonEvent) {
        switch (buttonEvent) {
            case EButtonEvent.OPEN_INVENTORY:
                this.homeUINodes[0].active = false;
                this.homeUINodes[1].active = true;
                break;

            case EButtonEvent.OPEN_SETTING:
                mEventEmitter.instance.emit('ENABLE_POPUP', EPopupType.SETTING);
                break;

            case EButtonEvent.START:
                mEventEmitter.instance.emit(CEvent.GAME.CHANGE_STATE, EGameStatus.START_ROUND);
                break;

            default:
                break;
        }
    }
}