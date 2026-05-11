import { _decorator, Component, director } from 'cc';
import { GameEventManager } from '../core/GameEventManager';
import { IJoinGameData, IMainBetData } from '../interface/IJoinGameData';
import { CEvent } from '../constant/CEvent';
const { ccclass } = _decorator;

@ccclass('UIManager')
export class UIManager extends Component {
    gameEvent: GameEventManager;

    protected onLoad(): void {
        this.gameEvent = this.getComponent(GameEventManager);
        this.gameEvent.on("JOIN_GAME_SUCCESS", this.onJoinGameSuccess, this);
    }

    private onJoinGameSuccess(data: any) {
        const convertedData = data as IJoinGameData;
        const convertedBetData: IMainBetData[] = [];
        const betArray = (convertedData.mainBet as string).split(',');

        for (let value of betArray) {
            const detail = value.split(';');
            convertedBetData.push({ key: detail[0], value: +detail[1] });
        }
        convertedData.mainBet = convertedBetData;
        director.emit(CEvent.UI.SETUP_UI, convertedData);
    }
}