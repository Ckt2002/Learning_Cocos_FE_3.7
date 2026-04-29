import { _decorator, Component, Enum, Slider, Sprite, SpriteFrame, sys } from "cc";
import { mEventEmitter } from "../../Event/mEventEmitter";
import { CAudioEvent } from "../../Constant/CAudioEvent";
import { EAudioType } from "../../Enum/EAudioType";
import { CLocalStorageKey } from "../../Constant/CLocalStorageKey";

const { ccclass, property } = _decorator;

@ccclass('SettingItem')
export class SettingItem extends Component {
    @property({ type: Enum(EAudioType) })
    private audioType: EAudioType = EAudioType.SFX;

    @property(Sprite)
    private icon: Sprite = null;

    @property([SpriteFrame])
    private iconFrames: SpriteFrame[] = [];

    @property(Slider)
    private slider: Slider = null;

    private storageKey: string = '';

    protected onLoad(): void {
        if (this.audioType === EAudioType.BGM) {
            this.storageKey = CLocalStorageKey.BGM_AUDIO;
            return;
        }
        this.storageKey = CLocalStorageKey.SFX_AUDIO;
    }

    protected start(): void {
        const savedValue = sys.localStorage.getItem(this.storageKey);
        if (savedValue !== null) {
            const volume = parseFloat(savedValue);
            this.slider.progress = volume;
        }
    }

    public onSlide() {
        mEventEmitter.instance.emit(CAudioEvent.SET_VOLUME, this.audioType, this.slider.progress);
        sys.localStorage.setItem(this.storageKey, this.slider.toString());
        if (this.slider.progress > 0) {
            this.icon.spriteFrame = this.iconFrames[0];
            return;
        }
        this.icon.spriteFrame = this.iconFrames[1];
    }
}