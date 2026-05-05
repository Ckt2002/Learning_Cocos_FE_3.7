import { _decorator, Enum } from 'cc';
import { SpawnData } from './SpawnInformation';
import { EBulletType } from '../Enum/EType';

const { ccclass, property } = _decorator;

@ccclass("BulletSpawnData")
export class BulletSpawnData extends SpawnData {
    @property({ type: Enum(EBulletType) })
    public bulletType: EBulletType = EBulletType.NORMAL;

    public getType(): number {
        return this.bulletType;
    }
}