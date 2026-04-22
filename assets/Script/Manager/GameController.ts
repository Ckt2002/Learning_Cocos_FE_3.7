import { _decorator, Component, Node } from 'cc';
import { mEventTarget } from '../Event/mEventEmitter';
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {

    protected onLoad(): void {
        mEventTarget.instance = new mEventTarget();
        console.log(mEventTarget.instance);
    }
}