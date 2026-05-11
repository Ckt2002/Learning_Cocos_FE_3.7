import { _decorator, Component, director, Enum, Label } from 'cc';
import { IJoinGameData } from '../../interface/IJoinGameData';
const { ccclass, property } = _decorator;

@ccclass('UIElement')
export abstract class UIElement extends Component {
    @property(Label)
    label: Label = null;

    protected onLoad(): void {
        director.on("SETUP_UI", this.onSetupUI, this);
    }

    protected onSetupUI(convertedData: IJoinGameData) {
    }
}