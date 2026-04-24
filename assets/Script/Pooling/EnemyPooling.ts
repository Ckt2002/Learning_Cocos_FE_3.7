import { _decorator, Enum, Node } from 'cc';
import { EnemySpawn } from '../Spawn/EnemySpawn';
import { PoolingController } from './PoolingController';
import { EEnemyType } from '../Enum/EEnemyType';

const { ccclass, property } = _decorator;

@ccclass("EnemyPooling")
export class EnemyPooling extends PoolingController<EnemySpawn> {
    @property([EnemySpawn])
    public prefabs: EnemySpawn[] = [];

    protected getPrefabInformation(): EnemySpawn[] {
        return this.prefabs;
    }

    public getEnemy(type: EEnemyType): Node {
        return this.getNode(type);
    }
}