import { _decorator, CCFloat, CCInteger, Component, Node, Vec2, ViewGroup } from 'cc';
import { CRoundEvent } from '../Constant/CRoundEvent';
const { ccclass, property } = _decorator;

@ccclass('CharacterController')
export class CharacterController extends Component {
    @property({
        group: { name: "Stats" },
        type: CCInteger,
        visible: true,
    })
    public moveSpeed: number = 200;

    @property({
        group: { name: "Stats" },
        type: CCFloat,
        visible: true,
    })
    public fireRate: number = 0.5;

    @property({
        group: { name: "Stats" },
        type: CCFloat,
        visible: true,
    })
    public maxHealth: number = 100;

    @property({
        group: { name: "Limit" },
        visible: true,
    })
    public limitVertical: Vec2 = new Vec2();

    @property(Node)
    public firePoint: Node = null;

    @property(Node)
    private healthBarNode: Node = null;

    private currentHealth = 0;

    protected onEnable(): void {
        this.currentHealth = this.maxHealth;
        this.updateCurrentHealth(0);
    }

    public takeDamage(value: number) {
        this.updateCurrentHealth(-value);
        if (this.currentHealth <= 0) {
            console.log("Die");
            // Call event to character manager -> send to round -> end -> show popup.
        }
    }

    public updateCurrentHealth(value: number) {
        this.currentHealth += value;
        this.healthBarNode.emit(CRoundEvent.UPDATE_HEALTH_BAR, this.currentHealth / this.maxHealth);
    }
}