import { _decorator, director } from 'cc';
import { UIButton } from './UIButton';
import { CEvent } from '../../constant/CEvent';
const { ccclass } = _decorator;

@ccclass('UISpineButton')
export class UISpineButton extends UIButton {

    protected onLoad(): void {
        super.onLoad();
        director.on(CEvent.Game.COMPLETED, this.onChangeInteract, this);
    }

    private onChangeInteract() {
        this.button.interactable = true;
    }

    protected onClick(): void {
        director.emit(CEvent.Game.SPIN);
        this.button.interactable = false;
    }
}