import { _decorator, CCInteger, Component, Node } from "cc";
import { CRoundEvent } from "../Constant/CRoundEvent";

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

    @property(Node)
    private healthBarNode: Node = null;

    protected onEnable(): void {
    }

    protected onDisable(): void {
        this.reset();
    }

    public takeDamage(value: number) {
        this.updateCurrentHealth(-value);
        if (this.currentHealth <= 0) {
            this.node.active = false;
        }
    }

    public updateCurrentHealth(value: number) {
        this.currentHealth += value;
        this.healthBarNode.emit(CRoundEvent.UPDATE_HEALTH_BAR, this.currentHealth / this.maxHealth);
    }

    private reset() {
        this.currentHealth = this.maxHealth;
        this.updateCurrentHealth(0);
    }
}