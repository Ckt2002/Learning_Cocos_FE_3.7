import { _decorator, Enum } from 'cc';
import { SpawnInformation } from './SpawnInformation';
import { EBulletType } from '../Enum/EBulletType';

const { ccclass, property } = _decorator;

@ccclass("BulletSpawn")
export class BulletSpawn extends SpawnInformation {
    @property({ type: Enum(EBulletType) })
    public bulletType: EBulletType = EBulletType.NORMAL;

    public getType(): number {
        return this.bulletType;
    }
}