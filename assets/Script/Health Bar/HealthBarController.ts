import { _decorator, Component, ProgressBar, Node, tween, Vec3, UITransform } from "cc";
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

    protected onEnable(): void {
        this.node.on(CRoundEvent.UPDATE_HEALTH_BAR, this.updateHealthBar, this);
    }

    protected start(): void {
        this.updateHealthBar(1);
    }

    protected onDisable(): void {
        this.node.off(CRoundEvent.UPDATE_HEALTH_BAR, this.updateHealthBar, this);
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