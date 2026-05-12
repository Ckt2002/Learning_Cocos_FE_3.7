import { _decorator, director, Enum } from 'cc';
import { EBetButtonType } from '../../enum/EUIType';
import { UIButton } from './UIButton';
import { CEvent } from '../../constant/CEvent';
const { ccclass, property } = _decorator;

@ccclass('UISpineButton')
export class UISpineButton extends UIButton {
    protected onClick(): void {
        director.emit(CEvent.Game.SPIN);
    }
}