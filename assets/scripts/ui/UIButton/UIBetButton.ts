import { _decorator, director, Enum } from 'cc';
import { EBetButtonType } from '../../enum/EUIType';
import { UIButton } from './UIButton';
import { CEvent } from '../../constant/CEvent';
const { ccclass, property } = _decorator;

@ccclass('UIBetButton')
export class UIBetButton extends UIButton {
    @property({ type: Enum(EBetButtonType) })
    buttonType: EBetButtonType = EBetButtonType.INCREASE;

    protected onLoad(): void {
        super.onLoad();
        director.on(CEvent.Button.UPDATE_INTERACTABLE, this.onChangeInteract, this);
    }

    private onChangeInteract(type: EBetButtonType, isInteract: boolean) {
        if (this.buttonType !== type) {
            return;
        }

        this.button.interactable = isInteract;
    }

    protected onClick(): void {
        switch (this.buttonType) {
            case EBetButtonType.INCREASE:
                director.emit(CEvent.UI.CHANGE_BET_SIZE, 1);
                break;

            case EBetButtonType.DECREASE:
                director.emit(CEvent.UI.CHANGE_BET_SIZE, -1);
                break;

            default:
                break;
        }
    }
}