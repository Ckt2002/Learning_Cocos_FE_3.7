import { _decorator, Component, ProgressBar, tween, UITransform } from "cc";
import { CRoundEvent } from "../Constant/CRoundEvent";

const { ccclass, property } = _decorator;

@ccclass('HealthBarController')
export class HealthBarController extends Component {
    @property(ProgressBar)
    private healthBar: ProgressBar = null;

    @property(UITransform)
    private foreBar: UITransform = null;

    @property(UITransform)
    private groundBar: UITransform = null;

    protected start(): void {
        this.updateHealthBar(1);
    }

    public updateHealthBar(value: number) {
        this.healthBar.progress = value;

        if (!this.groundBar) {
            return;
        }

        let targetWidth = this.foreBar.contentSize.width;
        let currentSize = { width: this.groundBar.contentSize.width };
        tween(currentSize)
            .to(0.5, { width: targetWidth }, {
                onUpdate: () => {
                    this.groundBar.setContentSize(currentSize.width, this.groundBar.contentSize.height);
                }
            })
            .start();
    }
}