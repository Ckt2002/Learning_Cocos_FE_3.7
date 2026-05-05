import { _decorator, Component, sys } from "cc";
import { AudioController } from "../Audio/AudioController";
import { mEventEmitter } from "../Event/mEventEmitter";
import { CLocalStorageKey } from "../Constant/CLocalStorageKey";
import { EAudioClipType, EAudioType } from "../Enum/EType";
import { CEvent } from "../Constant/CEvent";

const { ccclass, property } = _decorator;

@ccclass('AudioManager')
export class AudioManager extends Component {
    public static instance: AudioManager = null;

    @property(AudioController)
    private bgmAudio: AudioController = null;

    @property(AudioController)
    private sfxAudio: AudioController = null;

    protected onLoad(): void {
        if (!AudioManager.instance) {
            AudioManager.instance = this;
        }
    }

    protected start(): void {
        this.registerEvents();

        sys.localStorage.setItem(CLocalStorageKey.BGM_AUDIO, this.bgmAudio.getVolume().toString());
        sys.localStorage.setItem(CLocalStorageKey.SFX_AUDIO, this.sfxAudio.getVolume().toString());
    }

    protected onDestroy(): void {
        mEventEmitter.instance.removeAllOwnerEvents(this);
        AudioManager.instance = null;
    }

    private registerEvents() {
        mEventEmitter.instance.registerEvent(CEvent.AUDIO.SET_VOLUME, this.setVolume.bind(this), this);
        mEventEmitter.instance.registerEvent(CEvent.AUDIO.PLAY_SFX, this.playSFX.bind(this), this);
        mEventEmitter.instance.registerEvent(CEvent.AUDIO.RESET_BGM, this.resetBgm.bind(this), this);
        mEventEmitter.instance.registerEvent(CEvent.AUDIO.STOP_ALL_AUDIOS, this.stopAllAudios.bind(this), this);
    }

    public playSFX(sfxType: EAudioClipType): void {
        this.sfxAudio.playOnce(sfxType);
    }

    public resetBgm(): void {
        this.bgmAudio.stop();
        this.bgmAudio.play();
    }

    public pauseAllAudios(): void {
        this.bgmAudio.pause();
        this.sfxAudio.pause();
    }

    public stopAllAudios(): void {
        this.bgmAudio.stop();
        this.sfxAudio.stop();
    }

    private setVolume(audioType: EAudioType, volume: number) {
        switch (audioType) {
            case EAudioType.BGM:
                this.bgmAudio.setVolume(volume);
                break;

            case EAudioType.SFX:
                this.sfxAudio.setVolume(volume);
                break;

            default:
                break;
        }
    }
}