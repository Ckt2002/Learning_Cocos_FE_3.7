import { _decorator, CCInteger, Component, Enum, Node } from "cc";
import { EEnemyType } from "../../Enum/EEnemyType";
import { CRoundEvent } from "../../Constant/CRoundEvent";
import { GameManager } from "../GameManager";

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
    @property({ type: [EnemySpawnTimeData], visible: true })
    public enemySpawnTimes: EnemySpawnTimeData[] = [];

    @property({ type: CCInteger, visible: true })
    private gameTimeLimit: number = 60;

    @property(Node)
    private enemyNode: Node = null;

    private gameDuration: number = 0;
    private enemySpawnDurations: Map<EEnemyType, { duration: number, spawnTime: number }> = new Map();

    protected onLoad(): void {
        for (let data of this.enemySpawnTimes) {
            this.enemySpawnDurations.set(data.type, { duration: 0, spawnTime: data.spawnTime });
        }

        this.node.on(CRoundEvent.INIT_ROUND, this.init, this);
        this.node.on(CRoundEvent.RESET_ROUND, this.init, this);
        this.node.on('PAUSE_ROUND', this.pause, this);
    }

    protected update(dt: number): void {
        if (GameManager.pauseGame) {
            return;
        }
        this.calculateRoundTime(dt);
        this.calculateSpawnTime(dt);
    }

    onDestroy() {
        this.node.targetOff(this);
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

    public init() {
        this.reset();
        this.waitForSeconds(3);
    }

    private waitForSeconds(time: number) {
        setTimeout(() => {
            GameManager.pauseGame = false;
        }, time * 1000);
    }

    public reset() {
        this.gameDuration = 0;
        for (const value of this.enemySpawnDurations) {
            value[1].duration = 0;
        }
        GameManager.pauseGame = true;
    }

    private pause() {
        GameManager.pauseGame = true;
    }
}