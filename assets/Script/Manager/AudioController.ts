import { _decorator, AudioClip, AudioSource, CCBoolean, Component } from "cc";
import { EAudioClipType } from "../Enum/EAudioClipType";

const { ccclass, property } = _decorator;

@ccclass('AudioController')
export class AudioController extends Component {
    @property(AudioSource)
    audioSource: AudioSource = null;

    @property([AudioClip])
    audioClips: AudioClip[] = [];

    @property(CCBoolean)
    playOnAwake: boolean = false;

    @property(CCBoolean)
    loop: boolean = false;

    protected start(): void {
        this.audioSource.clip = this.audioClips[0];
        this.audioSource.loop = this.loop;
        if (this.playOnAwake) {
            this.play();
        }
    }

    public getVolume(): number {
        return this.audioSource.volume;
    }

    public play(): void {
        this.audioSource.loop = this.loop;
        this.audioSource.play();
    }

    public playOnce(clipIndex: EAudioClipType): void {
        this.audioSource.playOneShot(this.audioClips[clipIndex]);
    }

    public pause(): void {
        this.audioSource.pause();
    }

    public stop(): void {
        this.audioSource.loop = false;
        this.audioSource.stop();
    }

    public setVolume(volume: number): void {
        this.audioSource.volume = volume;
    }

    public changeClip(clipIndex: EAudioClipType): void {
        this.audioSource.clip = this.audioClips[clipIndex];
    }
}