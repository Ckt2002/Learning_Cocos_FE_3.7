import { _decorator, Component, Node } from 'cc';
import { mEventEmitter } from '../../Event/mEventEmitter';
import { EButtonEvent } from '../../Enum/EButtonEvent';
import { ButtonManager } from './ButtonManager';
import { CGameEvent } from '../../Constant/CGameEvent';
import { EGameState } from '../../Enum/EGameState';
import { EPopup } from '../../Enum/EPopup';
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
                mEventEmitter.instance.emit('ENABLE_POPUP', EPopup.SETTING);
                break;

            case EButtonEvent.START:
                mEventEmitter.instance.emit(CGameEvent.CHANGE_STATE, EGameState.START_ROUND);
                break;

            default:
                break;
        }
    }
}