import { _decorator, director } from 'cc';
import { IJoinGameData, IMainBetData } from '../../interface/IJoinGameData';
import { UIElement } from '../UIElements/UIElement';
import { EBetButtonType } from '../../enum/EUIType';
import * as utils from '../../utils/utils';
const { ccclass } = _decorator;

@ccclass('UIBetSize')
export abstract class UIBetSize extends UIElement {
    currentBetIndex: number = 0;
    mainBetData: IMainBetData[] = [];
    betNumber: number = 25;

    protected onLoad(): void {
        super.onLoad();
        this.currentBetIndex = 0;
        director.on("CHANGE_BET_SIZE", this.changeBetSize, this);
    }

    protected onSetupUI(convertedData: IJoinGameData) {
        this.mainBetData = convertedData.mainBet as IMainBetData[];
        this.updateUI();
    }

    private changeBetSize(value: number) {
        this.currentBetIndex += value;

        if (this.currentBetIndex > 0) {
            director.emit("UPDATE_INTERACTABLE", EBetButtonType.DECREASE, true);
        }
        if (this.currentBetIndex < this.mainBetData.length - 1) {
            director.emit("UPDATE_INTERACTABLE", EBetButtonType.INCREASE, true);
        }

        if (this.currentBetIndex === 0) {
            director.emit("UPDATE_INTERACTABLE", EBetButtonType.DECREASE, false);
        }
        if (this.currentBetIndex === this.mainBetData.length - 1) {
            director.emit("UPDATE_INTERACTABLE", EBetButtonType.INCREASE, false);
        }

        this.updateUI();
    }

    private updateUI() {
        const value = this.mainBetData[this.currentBetIndex].value / this.betNumber;
        utils.tweenMoney(this.label, 0.3, value, { acceptRunDown: true }, (value: any) => '$' + utils.formatMoney(value));
    }

    protected onDestroy(): void {
        director.targetOff(this);
    }
}