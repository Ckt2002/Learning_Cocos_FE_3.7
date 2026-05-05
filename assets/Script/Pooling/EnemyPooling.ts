import { _decorator, Node } from 'cc';
import { EnemySpawnData } from '../Spawn/EnemySpawnData';
import { PoolingController } from './PoolingController';
import { EEnemyType } from '../Enum/EType';

const { ccclass, property } = _decorator;

@ccclass("EnemyPooling")
export class EnemyPooling extends PoolingController<EnemySpawnData> {
    @property([EnemySpawnData])
    public prefabs: EnemySpawnData[] = [];

    protected getPrefabInformation(): EnemySpawnData[] {
        return this.prefabs;
    }

    public getEnemy(type: EEnemyType): Node {
        return this.getNode(type);
    }
}