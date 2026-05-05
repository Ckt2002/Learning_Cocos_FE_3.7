import { _decorator, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('EnemyConfig')
export class EnemyConfig {
    @property
    public moveSpeed: number = 200;

    @property
    public damage: number = 10;

    @property
    public maxHealth: number = 10;
}