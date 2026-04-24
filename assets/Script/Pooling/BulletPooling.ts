import { _decorator, Node } from 'cc';
import { PoolingController } from './PoolingController';
import { BulletSpawn } from '../Spawn/BulletSpawn';
import { EBulletType } from '../Enum/EBulletType';

const { ccclass, property } = _decorator;

@ccclass("BulletPooling")
export class BulletPooling extends PoolingController<BulletSpawn> {
    @property([BulletSpawn])
    public prefabs: BulletSpawn[] = [];

    protected getPrefabInformation(): BulletSpawn[] {
        return this.prefabs;
    }

    public getBullet(type: EBulletType): Node {
        return this.getNode(type);
    }
}