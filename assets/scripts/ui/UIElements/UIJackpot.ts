import { _decorator, director } from 'cc';
import { UIElement } from './UIElement';
import { IJackpotData, IJoinGameData, IMainBetData } from '../../interface/IJoinGameData';
import * as utils from '../../utils/utils';
const { ccclass } = _decorator;

@ccclass('UIJackpot')
export abstract class UIJackpot extends UIElement {

    private currentBetIndex = 0;
    private jackpotData: IJackpotData;

    protected onLoad(): void {
        super.onLoad();
        this.currentBetIndex = 1;
        director.on("CHANGE_BET_TOTAL", this.changeBetSize, this);
    }

    protected onSetupUI(convertedData: IJoinGameData) {
        this.jackpotData = convertedData.jackpot;
        this.updateUI();
    }

    private changeBetSize(value: number) {
        this.currentBetIndex += value;
        if (this.currentBetIndex === 0) {
            this.currentBetIndex = 1;
        }
        if (this.currentBetIndex > 4) {
            this.currentBetIndex = 4;
        }
        this.updateUI();
    }

    private updateUI() {
        const value = this.jackpotData[`${this.currentBetIndex}_USD_GRAND`];
        utils.tweenMoney(this.label, 0.3, value, { acceptRunDown: true }, (value: any) => utils.formatMoney(value) + '$');
    }
}