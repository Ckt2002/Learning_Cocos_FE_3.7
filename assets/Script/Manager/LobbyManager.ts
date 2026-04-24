import { _decorator, Node } from 'cc';
import { mEventEmitter } from '../Event/mEventEmitter';
import { CLayerEvent } from '../Constant/CLayerEvent';
import { EButtonEvent } from '../Enum/EButtonEvent';
import { EGameState } from '../Enum/EGameState';
import { CGameEvent } from '../Constant/CGameEvent';
import { BaseLayerManager } from './BaseLayerManager';
const { ccclass, property } = _decorator;

@ccclass('LobbyManager')
export class LobbyManager extends BaseLayerManager<void> {

    @property([Node])
    lobbyUINodes: Node[] = [];

    protected registerEvents(): void {
        mEventEmitter.instance.registerEvent(CLayerEvent.ENABLE_LOBBY, this.enableContainer.bind(this), this);
        mEventEmitter.instance.registerEvent(CLayerEvent.DISABLE_LOBBY, this.disableContainer.bind(this), this);

        super.registerEvents();
    }

    protected layerEventHandler(buttonEvent: EButtonEvent) {
        switch (buttonEvent) {
            case EButtonEvent.START_ROUND:
                mEventEmitter.instance.emit(CGameEvent.CHANGE_STATE, EGameState.START_ROUND);
                break;

            default:
                for (let index = 0; index < this.lobbyUINodes.length; index++) {
                    this.lobbyUINodes[index].active = buttonEvent === index;
                }
                break;
        }
    }
}