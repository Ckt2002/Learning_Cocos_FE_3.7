import { _decorator, Enum } from 'cc';
import { SpawnData } from './SpawnInformation';
import { EEnemyType } from '../Enum/EType';

const { ccclass, property } = _decorator;

@ccclass("EnemySpawnData")
export class EnemySpawnData extends SpawnData {
    @property({ type: Enum(EEnemyType) })
    public enemyType: EEnemyType = EEnemyType.WOLF;

    public getType(): number {
        return this.enemyType;
    }
}