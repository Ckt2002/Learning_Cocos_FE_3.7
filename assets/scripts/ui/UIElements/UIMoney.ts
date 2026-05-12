import { _decorator, Component, director, Label } from 'cc';
import { IJackpotData, IJoinGameData, IMainBetData } from '../../interface/IJoinGameData';
import * as utils from '../../utils/utils';
import { CEvent } from '../../constant/CEvent';
import { EBetButtonType } from '../../enum/EUIType';
const { ccclass, property } = _decorator;

@ccclass('UIMoney')
export class UIMoney extends Component {
    @property(Label)
    betTotalLabel: Label = null;

    @property(Label)
    jackpotLabel: Label = null;

    @property(Label)
    betSizeLabel: Label = null;

    @property(Label)
    walletLabel: Label = null;

    @property(Label)
    winAmountLabel: Label = null;

    private wallet: number = 0;
    private currentBetIndex = 0;
    private jackpotData: IJackpotData;
    private mainBetData: IMainBetData[] = [];
    private betNumber: number = 25;

    protected onLoad(): void {
        this.currentBetIndex = 0;
        director.on(CEvent.UI.SETUP_UI, this.onSetupUI, this);
        director.on(CEvent.UI.CHANGE_BET_SIZE, this.changeBetSize, this);
        director.on(CEvent.Game.COMPLETED, this.updateWinAmount, this);
    }

    protected onSetupUI(convertedData: IJoinGameData) {
        this.winAmountLabel.string = '';
        this.wallet = convertedData.wallet;
        this.jackpotData = convertedData.jackpot;
        this.mainBetData = (convertedData.mainBet as IMainBetData[]);
        this.updateUI();
    }

    private updateUI() {
        utils.tweenMoney(this.walletLabel, 0.3, this.wallet, { acceptRunDown: true }, (value: any) => '$' + utils.formatMoney(value));

        const jackpotValue = this.jackpotData[`${this.currentBetIndex === 0 ? 1 : this.currentBetIndex}_USD_GRAND`];
        utils.tweenMoney(this.jackpotLabel, 0.3, jackpotValue, { acceptRunDown: true }, (value: any) => utils.formatMoney(value) + '$');

        const totalValue = this.mainBetData[this.currentBetIndex].value;
        utils.tweenMoney(this.betTotalLabel, 0.3, totalValue, { acceptRunDown: true }, (value: any) => utils.formatMoney(value) + '$');

        const betSizeValue = this.mainBetData[this.currentBetIndex].value / this.betNumber;
        utils.tweenMoney(this.betSizeLabel, 0.3, betSizeValue, { acceptRunDown: true }, (value: any) => '$' + utils.formatMoney(value));
    }

    private updateWinAmount(amount: number) {
        this.wallet += amount;
        utils.tweenMoney(this.walletLabel, 0.3, this.wallet, { acceptRunDown: true }, (value: any) => '$' + utils.formatMoney(value));

        utils.tweenMoney(this.winAmountLabel, 0.3, amount, { acceptRunDown: true }, (value: any) => utils.formatMoney(value) + '$');
    }

    private changeBetSize(value: number) {
        this.currentBetIndex += value;

        if (this.currentBetIndex > 0) {
            director.emit(CEvent.Button.UPDATE_INTERACTABLE, EBetButtonType.DECREASE, true);
        }
        if (this.currentBetIndex < this.mainBetData.length - 1) {
            director.emit(CEvent.Button.UPDATE_INTERACTABLE, EBetButtonType.INCREASE, true);
        }

        if (this.currentBetIndex === 0) {
            this.currentBetIndex = 0;
            director.emit(CEvent.Button.UPDATE_INTERACTABLE, EBetButtonType.DECREASE, false);
        }
        if (this.currentBetIndex >= this.mainBetData.length - 1) {
            this.currentBetIndex = this.mainBetData.length - 1;
            director.emit(CEvent.Button.UPDATE_INTERACTABLE, EBetButtonType.INCREASE, false);
        }
        this.updateUI();
    }
}