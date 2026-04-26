import { _decorator, Enum, Prefab } from 'cc';
import { SpawnData } from './SpawnInformation';
import { EEnemyType } from '../Enum/EEnemyType';

const { ccclass, property } = _decorator;

@ccclass("EnemySpawnData")
export class EnemySpawnData extends SpawnData {
    @property({ type: Enum(EEnemyType) })
    public enemyType: EEnemyType = EEnemyType.WOLF;

    public getType(): number {
        return this.enemyType;
    }
}