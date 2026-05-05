import { _decorator, Component, sp } from "cc";

const { ccclass, property } = _decorator;

@ccclass('CharacterAnimation')
export class CharacterAnimation extends Component {
    @property(sp.Skeleton)
    private characterSpine: sp.Skeleton = null;

    public changeAnimation(trackIndex: number, animationName: string, delay: number = 0, loop: boolean = false): void {
        this.characterSpine.addAnimation(trackIndex, animationName, loop, delay);
    }

    public setAnimation(trackIndex: number, animationName: string, loop: boolean = false): void {
        if (this.checkSameAnimation(trackIndex, animationName)) {
            return;
        }
        this.characterSpine.setAnimation(trackIndex, animationName, loop);
    }

    public setAnimationOne(trackIndex: number, animationName: string, onFinish?: () => void): void {
        this.characterSpine.setAnimation(trackIndex, animationName, false);
        this.characterSpine.setCompleteListener((entry) => {
            if (entry.animation.name === animationName) {
                this.characterSpine.setCompleteListener(null);
                this.characterSpine.clearTrack(trackIndex);
            }
        });
    }

    public pauseAnimation(pause: boolean): void {
        this.characterSpine.paused = pause;
    }

    public stopAnimationByTrack(trackIndex: number): void {
        this.characterSpine.clearTrack(trackIndex);
    }

    public stopAnimation(): void {
        this.characterSpine.clearTracks()
    }

    private checkSameAnimation(trackIndex: number, animationName: string): boolean {
        const entry = this.characterSpine.getCurrent(trackIndex);
        if (!entry) {
            return false;
        }
        return entry.animation.name === animationName;
    }
}