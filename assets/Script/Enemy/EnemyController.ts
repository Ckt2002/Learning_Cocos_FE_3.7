import { _decorator, CCInteger, Component, Enum, Node, Tween, tween, UITransform } from "cc";
import { CRoundEvent } from "../Constant/CRoundEvent";
import { EEnemyType } from '../Enum/EEnemyType';
import { HealthBarController } from "../Health Bar/HealthBarController";

const { ccclass, property } = _decorator;

@ccclass("EnemyController")
export class EnemyController extends Component {

    @property({ group: { name: "Stats" }, type: CCInteger })
    public moveSpeed: number = 200;

    @property({ group: { name: "Stats" }, type: CCInteger })
    public damage: number = 10;

    @property({ group: { name: "Stats" }, type: CCInteger })
    public maxHealth: number = 10;

    @property({ group: { name: "Stats" }, type: CCInteger })
    public currentHealth: number = 10;

    @property(HealthBarController)
    private healthBarController: HealthBarController = null;

    @property(UITransform)
    private spriteUI: UITransform = null;

    @property({ type: Enum(EEnemyType) })
    public readonly enemyType: EEnemyType = EEnemyType.WOLF;

    private bounceTween: any = null;
    private originalSpriteWidth: number = 0;

    protected onEnable(): void {
        this.reset();
        this.runAnimation();
    }

    protected start(): void {
        this.runAnimation();
    }

    public takeDamage(value: number): boolean {
        this.updateCurrentHealth(-value);
        if (this.currentHealth <= 0) {
            this.node.active = false;
        }

        return this.currentHealth <= 0 && this.enemyType === EEnemyType.DRAGON;
    }

    public updateCurrentHealth(value: number) {
        this.currentHealth += value;
        this.healthBarController.updateHealthBar(this.currentHealth / this.maxHealth);
    }

    private reset() {
        this.currentHealth = this.maxHealth;
        this.updateCurrentHealth(0);
        this.stopAnimation();
    }

    private runAnimation() {
        if (this.originalSpriteWidth <= 2) {
            this.originalSpriteWidth = this.spriteUI.contentSize.width;
            if (this.originalSpriteWidth <= 2) return;
        }
        const targetWidth = this.originalSpriteWidth * 1.2;
        this.bounceTween = tween(this.spriteUI)
            .to(1, { width: targetWidth })
            .to(1, { width: this.originalSpriteWidth })
            .union()
            .repeatForever()
            .start();
    }

    private stopAnimation() {
        if (this.bounceTween) {
            this.bounceTween.stop();
            this.bounceTween = null;
        }

        if (this.spriteUI) {
            this.spriteUI.width = this.spriteUI.contentSize.width;
        }
    }
}