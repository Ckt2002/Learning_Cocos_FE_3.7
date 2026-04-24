import { _decorator, Component, input, Input, EventKeyboard, KeyCode } from 'cc';

const { ccclass, property } = _decorator;

@ccclass("PlayerInput")
export class PlayerInput extends Component {
    protected onLoad(): void {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown.bind(this), this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp.bind(this), this);
    }

    protected onDestroy(): void {
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    onKeyDown(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.KEY_W:
            case KeyCode.ARROW_UP:
                this.node.emit('MOVE_UP');
                break;

            case KeyCode.KEY_S:
            case KeyCode.ARROW_DOWN:
                this.node.emit('MOVE_DOWN');
                break;

            default:
                break;
        }
    }

    onKeyUp(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.KEY_W:
            case KeyCode.KEY_S:
            case KeyCode.ARROW_UP:
            case KeyCode.ARROW_DOWN:
                this.node.emit('STOP');
                break;

            default:
                break;
        }
    }
}