import { _decorator, Component, director, Label } from 'cc';
import { IJoinGameData } from '../../interface/IJoinGameData';
import { CEvent } from '../../constant/CEvent';
const { ccclass, property } = _decorator;

@ccclass('UIElement')
export abstract class UIElement extends Component {
    @property(Label)
    label: Label = null;

    protected onLoad(): void {
        director.on(CEvent.UI.SETUP_UI, this.onSetupUI, this);
    }

    protected onSetupUI(convertedData: IJoinGameData) {
    }
}