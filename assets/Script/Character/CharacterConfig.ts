import { _decorator, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CharacterConfig')
export class CharacterConfig {
    @property
    public moveSpeed: number = 200;

    @property
    public fireRate: number = 0.5;

    @property
    public maxHealth: number = 100;

    @property
    public movementLimit: Vec2 = new Vec2();
}