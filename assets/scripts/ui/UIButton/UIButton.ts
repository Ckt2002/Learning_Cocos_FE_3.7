import { _decorator, Button, Component, EventHandler, js } from 'cc';
const { ccclass } = _decorator;

@ccclass('UIButton')
export abstract class UIButton extends Component {
    button: Button;

    protected onLoad(): void {
        this.button = this.getComponent(Button);
        this.button.interactable = false;
    }

    protected start(): void {
        this.setUpButton();
    }

    protected setUpButton(): void {
        const clickEvent = new EventHandler();
        clickEvent.target = this.node;
        clickEvent.component = js.getClassName(this);
        clickEvent.handler = this.onClick.name;

        this.button.clickEvents.push(clickEvent);
    }

    protected onClick() { }
}