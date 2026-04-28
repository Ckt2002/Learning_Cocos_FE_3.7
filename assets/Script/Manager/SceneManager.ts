import { _decorator, Component, director } from "cc";
import { mEventEmitter } from "../Event/mEventEmitter";

const { ccclass } = _decorator;

@ccclass('SceneManager')
export class SceneManager extends Component {
    protected start(): void {
        mEventEmitter.instance.registerEvent('CHANGE_SCENE', this.LoadScene, this);
    }

    protected onDestroy(): void {
        mEventEmitter.instance.removeAllOwnerEvents(this);
    }

    public LoadScene(sceneName: string) {
        director.loadScene(sceneName);
    }
}