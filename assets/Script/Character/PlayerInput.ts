import { _decorator, Component, input, Input, EventKeyboard, KeyCode } from 'cc';
import { CInputName } from '../Constant/CInputName';

const { ccclass } = _decorator;

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
                this.node.emit(CInputName.MOVE_UP, 1);
                break;

            case KeyCode.KEY_S:
            case KeyCode.ARROW_DOWN:
                this.node.emit(CInputName.MOVE_DOWN, -1);
                break;

            case KeyCode.SPACE:
                this.node.emit(CInputName.SHOOT);
                break;

            case KeyCode.KEY_E:
                this.node.emit(CInputName.SWITCH_BULLET);
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
                this.node.emit(CInputName.STOP_MOVING, 0);
                break;

            default:
                break;
        }
    }
}