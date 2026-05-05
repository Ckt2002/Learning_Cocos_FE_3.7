import { _decorator, Component, Node } from 'cc';
import { HealthBarController } from '../Health Bar/HealthBarController';
import { CharacterConfig } from './CharacterConfig';

const { ccclass, property } = _decorator;

@ccclass('CharacterController')
export class CharacterController extends Component {
    @property({ type: CharacterConfig, readonly: true })
    public stats: CharacterConfig;

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
        this.healthBarController.updateHealthBar(this.currentHealth / this.stats.maxHealth);
    }

    public reset() {
        this.currentHealth = this.stats.maxHealth;
        this.healthBarController.updateHealthBar(this.currentHealth / this.stats.maxHealth);
    }
}