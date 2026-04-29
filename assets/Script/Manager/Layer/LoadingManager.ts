import { _decorator, Component, director, Label, ProgressBar } from 'cc';
import { SceneManager } from '../SceneManager';

const { ccclass, property } = _decorator;

@ccclass('LoadingManager')
export class LoadingManager extends Component {
    @property(ProgressBar)
    private progressBar: ProgressBar = null;

    @property(Label)
    private percentLabel: Label = null;

    protected start(): void {
        this.reset();
        this.loadScene();
    }

    private loadScene(): void {
        const sceneName = SceneManager.instance.getSceneName();
        setTimeout(() => {
            director.preloadScene(sceneName,
                (completedCount, totalCount) => {
                    const progress = completedCount / totalCount;
                    this.updateProgress(progress);
                },
                () => {
                    setTimeout(() => {
                        director.loadScene(sceneName);
                    }, 1000)
                }
            )
        }, 1500);
    }

    private updateProgress(progress: number): void {
        if (this.progressBar.progress > progress) {
            return;
        }
        this.progressBar.progress = progress;
        const percent = Math.round(progress * 100);
        this.percentLabel.string = `${percent}%`;
    }

    private reset() {
        this.progressBar.progress = 0;
        this.percentLabel.string = `0%`;
    }
}