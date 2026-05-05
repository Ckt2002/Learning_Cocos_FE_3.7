import { _decorator, CCInteger, Component, Enum, Node } from "cc";
import { CEvent } from "../../Constant/CEvent";
import { EEnemyType } from "../../Enum/EType";

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
    public static isWaiting: boolean = false;
    public static pauseGame: boolean = false;

    @property({ type: [EnemySpawnTimeData], visible: true })
    public enemySpawnTimes: EnemySpawnTimeData[] = [];

    @property({ type: CCInteger, visible: true })
    private gameTimeLimit: number = 60;

    @property(Node)
    private enemyNode: Node = null;

    private gameDuration: number = 0;
    private waitTimer = 5;
    private enemySpawnDurations: Map<EEnemyType, { duration: number, spawnTime: number }> = new Map();

    protected onLoad(): void {
        for (let data of this.enemySpawnTimes) {
            this.enemySpawnDurations.set(data.type, { duration: 0, spawnTime: data.spawnTime });
        }

        this.node.on(CEvent.ROUND.INIT_ROUND, this.init, this);
        this.node.on(CEvent.ROUND.RESET_ROUND, this.init, this);
        this.node.on(CEvent.ROUND.PAUSE, this.pause, this);
        this.node.on(CEvent.ROUND.RESUME, this.resume, this);
    }

    protected update(dt: number): void {
        if (RoundManager.pauseGame) {
            return;
        }

        if (RoundManager.isWaiting) {
            this.waitForSecond(dt);
            return;
        }
        this.calculateRoundTime(dt);
        this.calculateSpawnTime(dt);
    }

    protected onDestroy(): void {
        this.unscheduleAllCallbacks();
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
                this.enemyNode.emit(CEvent.ROUND.SPAWN_ENEMY, type);
                time.duration = 0;
                continue;
            }
            time.duration += dt;
        }
    }

    public init() {
        this.reset();
        RoundManager.isWaiting = true;
        this.waitTimer = 3.5;
    }

    private waitForSecond(dt: number) {
        this.waitTimer -= dt;
        if (this.waitTimer <= 0) {
            this.waitTimer = -1;
            RoundManager.isWaiting = false;
            RoundManager.pauseGame = false;
        }
    }

    public reset() {
        this.gameDuration = 0;
        for (const value of this.enemySpawnDurations) {
            value[1].duration = 0;
        }
        RoundManager.isWaiting = true;
        RoundManager.pauseGame = false;
    }

    private pause() {
        RoundManager.pauseGame = true;
    }

    private resume() {
        RoundManager.pauseGame = false;
    }
}