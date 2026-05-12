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
    private currentMainBetIndex: number = 0;
    private currentBetId: string = '10';

    protected onLoad(): void {
        this.gameEvent.on("JOIN_GAME_SUCCESS", this.onJoinGameSuccess, this);

        director.on(CEvent.Game.SPIN, this.onSpin, this);
        director.on(CEvent.UI.CHANGE_BET_SIZE, this.onChangeBet, this);
    }

    private onJoinGameSuccess(data: any) {
        const convertedData = data as IJoinGameData;
        const betData: IMainBetData[] = [];
        const betArray = (convertedData.mainBet as string).split(',');

        for (let value of betArray) {
            const detail = value.split(';');
            betData.push({ key: detail[0], value: +detail[1] });
        }
        convertedData.mainBet = betData as IMainBetData[];
        this.gameData = convertedData;

        this.currentBetId = betData[0].key;

        director.emit(CEvent.UI.SETUP_UI, convertedData);
    }

    private onChangeBet(value: number) {
        this.currentMainBetIndex += value;
        this.currentMainBetIndex = Math.max(0, Math.min(4, this.currentMainBetIndex));

        this.currentBetId = (this.gameData.mainBet as IMainBetData[])[this.currentMainBetIndex].key;
    }

    private onSpin() {
        this.gameDirector.sendSpinRequest(this.currentBetId);
        this.gameData.wallet -= this.gameData.mainBet[this.currentMainBetIndex].value;
        director.emit(CEvent.UI.UPDATE_WALLET, this.gameData.wallet);
    }
}