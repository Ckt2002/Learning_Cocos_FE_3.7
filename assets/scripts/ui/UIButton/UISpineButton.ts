import { _decorator, director } from 'cc';
import { UIButton } from './UIButton';
import { CEvent } from '../../constant/CEvent';
const { ccclass } = _decorator;

@ccclass('UISpineButton')
export class UISpineButton extends UIButton {

    protected onLoad(): void {
        super.onLoad();
        director.on(CEvent.Button.ENABLE_SPIN, this.onEnableInteract, this);
    }

    private onEnableInteract() {
        this.button.interactable = true;
    }

    protected onClick(): void {
        director.emit(CEvent.Game.SPIN);
        this.button.interactable = false;
    }
}