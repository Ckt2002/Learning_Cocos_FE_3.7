import { _decorator, Node } from 'cc';
import { PoolingController } from './PoolingController';
import { BulletSpawnData } from '../Spawn/BulletSpawnData';
import { EBulletType } from '../Enum/EType';

const { ccclass, property } = _decorator;

@ccclass("BulletPooling")
export class BulletPooling extends PoolingController<BulletSpawnData> {
    @property([BulletSpawnData])
    public prefabs: BulletSpawnData[] = [];

    protected getPrefabInformation(): BulletSpawnData[] {
        return this.prefabs;
    }

    public getBullet(type: EBulletType): Node {
        return this.getNode(type);
    }
}