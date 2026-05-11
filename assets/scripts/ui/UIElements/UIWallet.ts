import { _decorator } from 'cc';
import { IJoinGameData } from '../../interface/IJoinGameData';
import { UIElement } from './UIElement';
import * as utils from '../../utils/utils';
const { ccclass, property } = _decorator;

@ccclass('UIWallet')
export abstract class UIWallet extends UIElement {

    private wallet: number = 0;

    protected onSetupUI(convertedData: IJoinGameData) {
        this.wallet = convertedData.wallet;
        this.updateUI();
    }

    private updateUI() {
        utils.tweenMoney(this.label, 0.3, this.wallet, { acceptRunDown: true }, (value: any) => '$' + utils.formatMoney(value));
    }
}