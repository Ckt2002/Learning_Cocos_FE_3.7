import { _decorator, CCInteger, Component, Enum } from "cc";
import { EEnemyType } from "../Enum/EEnemyType";

const { ccclass, property } = _decorator;

@ccclass('EnemySpawnTimeData')
class EnemySpawnTimeData {
    @property({ type: Enum(EEnemyType) })
    type: EEnemyType = EEnemyType.WOLF;

    @property(CCInteger)
    spawnTime: number = 0;
}

@ccclass('RoundManager')
export class RoundManager extends Component {
    @property({
        type: [EnemySpawnTimeData],
        visible: true,
    })
    public enemySpawnTimes: EnemySpawnTimeData[] = [];

    @property({
        type: EnemySpawnTimeData,
        visible: true,
    })
    public a: EnemySpawnTimeData = new EnemySpawnTimeData();

    @property({
        type: CCInteger,
        visible: true,
    })
    private gameTimeLimit: number = 60; // second

    private gameDuration: number = 0;
    private enemySpawnDurations: Map<EEnemyType, { duration: number, spawnTime: number }> = new Map();

    protected onLoad(): void {
        for (let data of this.enemySpawnTimes) {
            this.enemySpawnDurations.set(data.type, { duration: 0, spawnTime: data.spawnTime });
        }
    }

    protected onEnable(): void {
        this.gameDuration = 0;
    }

    protected update(dt: number): void {
        this.calculateRoundTime(dt);
        this.calculateSpawnTime(dt);
    }

    private calculateRoundTime(dt: number) {
        this.gameDuration += dt;
        if (this.gameDuration >= this.gameTimeLimit) {
            console.log("END ROUND STATE");
            return;
        }
    }

    private calculateSpawnTime(dt: number) {
        for (let time of this.enemySpawnDurations) {
            if (time[1].duration >= time[1].spawnTime) {
                // spawn
                time[1].duration = 0;
                continue;
            }
            time[1].duration += dt;
        }
    }
}