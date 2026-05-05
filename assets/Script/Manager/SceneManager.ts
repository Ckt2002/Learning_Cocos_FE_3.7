import { _decorator, Component, director } from "cc";
import { mEventEmitter } from "../Event/mEventEmitter";
import { CEvent } from "../Constant/CEvent";

const { ccclass } = _decorator;

@ccclass('SceneManager')
export class SceneManager extends Component {
    public static instance: SceneManager = null;
    private sceneName: string = '';

    protected onLoad(): void {
        if (!SceneManager.instance) {
            SceneManager.instance = this;
        }
    }

    protected start(): void {
        mEventEmitter.instance.registerEvent(CEvent.SCENE.CHANGE_SCENE, this.loadScene.bind(this), this);
    }

    protected onDestroy(): void {
        mEventEmitter.instance.removeAllOwnerEvents(this);
        SceneManager.instance = null;
    }

    public loadScene(sceneName: string): void {
        mEventEmitter.instance.emit(CEvent.AUDIO.STOP_ALL_AUDIOS);
        this.sceneName = sceneName;
        director.loadScene('Loading');
    }

    public getSceneName(): string { return this.sceneName }
}