import { _decorator, director } from 'cc';
import { UIElement } from './UIElement';
import { IJoinGameData, IMainBetData } from '../../interface/IJoinGameData';
import * as utils from '../../utils/utils';
import { CEvent } from '../../constant/CEvent';
const { ccclass } = _decorator;

@ccclass('UIBetTotal')
export abstract class UIBetTotal extends UIElement {
    currentBetIndex: number = 0;
    mainBetData: IMainBetData[] = [];

    protected onLoad(): void {
        super.onLoad();
        this.currentBetIndex = 0;
        director.on(CEvent.UI.CHANGE_BET_SIZE, this.changeBetSize, this);
    }

    protected onSetupUI(convertedData: IJoinGameData) {
        this.mainBetData = (convertedData.mainBet as IMainBetData[]);
        this.updateUI();
    }

    private changeBetSize(value: number) {
        this.currentBetIndex += value;
        this.updateUI();
    }

    private updateUI() {
        const value = this.mainBetData[this.currentBetIndex].value;
        utils.tweenMoney(this.label, 0.3, value, { acceptRunDown: true }, (value: any) => utils.formatMoney(value) + '$');
    }
}