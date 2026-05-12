import { _decorator, Component, director } from 'cc';
import { GameEventManager } from '../core/GameEventManager';
import { CEvent } from '../constant/CEvent';
import { IJoinGameData, IMainBetData } from '../interface/IJoinGameData';
import { GameDirector } from '../core/GameDirector';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    @property(GameEventManager)
    gameEvent: GameEventManager;

    @property(GameDirector)
    gameDirector: GameDirector;

    private gameData: IJoinGameData = null;
    private currentBetId: string = '10';

    protected onLoad(): void {
        this.gameEvent.on("JOIN_GAME_SUCCESS", this.onJoinGameSuccess, this);

        director.on(CEvent.Game.SPIN, this.onSpin, this);
    }

    private onJoinGameSuccess(data: any) {
        const convertedData = data as IJoinGameData;
        const betData: IMainBetData[] = [];
        const betArray = (convertedData.mainBet as string).split(',');

        for (let value of betArray) {
            const detail = value.split(';');
            betData.push({ key: detail[0], value: +detail[1] });
        }
        convertedData.mainBet = betData;
        this.gameData = convertedData;
        director.emit(CEvent.UI.SETUP_UI, convertedData);
    }

    private onChangeBet() {
        // this.currentBetId = ...;
    }

    private onSpin() {
        this.gameDirector.sendSpinRequest(this.currentBetId);
    }
}