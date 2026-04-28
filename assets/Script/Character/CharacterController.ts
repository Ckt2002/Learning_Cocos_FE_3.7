import { _decorator, animation, CCFloat, CCInteger, Component, Node, sp, Vec2 } from 'cc';
import { HealthBarController } from '../Health Bar/HealthBarController';

const { ccclass, property } = _decorator;

@ccclass('CharacterController')
export class CharacterController extends Component {
    @property({ group: { name: "Stats" }, type: CCInteger, visible: true })
    public moveSpeed: number = 200;

    @property({ group: { name: "Stats" }, type: CCFloat, visible: true })
    public fireRate: number = 0.5;

    @property({ group: { name: "Stats" }, type: CCFloat, visible: true })
    public maxHealth: number = 100;

    @property({ group: { name: "Limit" }, visible: true })
    public limitVertical: Vec2 = new Vec2();

    @property(Node)
    public firePoint: Node = null;

    @property(HealthBarController)
    private healthBarController: HealthBarController = null;

    private currentHealth = 0;

    public takeDamage(value: number): boolean {
        this.updateCurrentHealth(-value);
        return this.currentHealth > 0;
    }

    public updateCurrentHealth(value: number) {
        this.currentHealth += value;
        this.healthBarController.updateHealthBar(this.currentHealth / this.maxHealth);
    }

    public reset() {
        this.currentHealth = this.maxHealth;
        this.healthBarController.updateHealthBar(this.currentHealth / this.maxHealth);
    }
}