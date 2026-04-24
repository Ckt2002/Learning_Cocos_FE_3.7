import { _decorator, Enum, Prefab } from 'cc';
import { SpawnInformation } from './SpawnInformation';
import { EEnemyType } from '../Enum/EEnemyType';

const { ccclass, property } = _decorator;

@ccclass("EnemySpawn")
export class EnemySpawn extends SpawnInformation {
    @property({ type: Enum(EEnemyType) })
    public enemyType: EEnemyType = EEnemyType.WOLF;

    public getType(): number {
        return this.enemyType;
    }
}