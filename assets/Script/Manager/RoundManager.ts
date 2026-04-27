import { _decorator, CCInteger, Component, Enum, Node } from "cc";
import { EEnemyType } from "../Enum/EEnemyType";
import { EnemyManager } from "./EnemyManager";
import { CRoundEvent } from "../Constant/CRoundEvent";
import { GameManager } from "./GameManager";

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
        type: CCInteger,
        visible: true,
    })
    private gameTimeLimit: number = 60; // second

    private gameDuration: number = 0;
    private enemyNode: Node = null;
    private enemySpawnDurations: Map<EEnemyType, { duration: number, spawnTime: number }> = new Map();

    protected onLoad(): void {
        for (let data of this.enemySpawnTimes) {
            this.enemySpawnDurations.set(data.type, { duration: 0, spawnTime: data.spawnTime });
        }
    }

    protected start(): void {
        this.enemyNode = EnemyManager.instance.node;
    }

    protected onEnable(): void {
        this.gameDuration = 0;
    }

    protected update(dt: number): void {
        if (GameManager.pauseGame) {
            return;
        }
        this.calculateRoundTime(dt);
        this.calculateSpawnTime(dt);
    }

    private calculateRoundTime(dt: number) {
        this.gameDuration += dt;
        if (this.gameDuration >= this.gameTimeLimit) {
            return;
        }
    }

    private calculateSpawnTime(dt: number) {
        for (let data of this.enemySpawnDurations) {
            const type = data[0];
            const time = data[1];
            if (time.duration >= time.spawnTime) {
                this.enemyNode.emit(CRoundEvent.SPAWN_ENEMY, type);
                time.duration = 0;
                continue;
            }
            time.duration += dt;
        }
    }
}