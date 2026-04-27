import { _decorator, CCInteger, Component, Enum, Node } from "cc";
import { CRoundEvent } from "../Constant/CRoundEvent";
import { EEnemyType } from '../Enum/EEnemyType';
import { HealthBarController } from "../Health Bar/HealthBarController";

const { ccclass, property } = _decorator;

@ccclass("EnemyController")
export class EnemyController extends Component {

    @property({
        group: { name: "Stats" },
        type: CCInteger,
    })
    public moveSpeed: number = 200;

    @property({
        group: { name: "Stats" },
        type: CCInteger,
    })
    public damage: number = 10;

    @property({
        group: { name: "Stats" },
        type: CCInteger,
    })
    public maxHealth: number = 10;

    @property({
        group: { name: "Stats" },
        type: CCInteger,
    })
    public currentHealth: number = 10;

    @property(HealthBarController)
    private healthBarController: HealthBarController = null;

    @property({ type: Enum(EEnemyType) })
    public readonly enemyType: EEnemyType = EEnemyType.WOLF;

    protected onEnable(): void {
        this.reset();
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
    }
}