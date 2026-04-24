import { _decorator } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BulletConfig')
export class BulletConfig {
    @property
    public damage: number = 10;

    @property
    public moveSpeed: number = 100;
}