import { _decorator, CCInteger, Component, Vec3, Node } from "cc";
import { EnemyController } from "../../Enemy/EnemyController";
import { SpawnPosManager } from "./SpawnPosManager";
import { EnemyPooling } from "../../Pooling/EnemyPooling";
import { GameManager } from "../GameManager";
import { RoomManager } from "../Layer/RoomManager";
import { ERoundStatus } from "../../Enum/EStatus";
import { EEnemyType } from '../../Enum/EType';
import { CEvent } from "../../Constant/CEvent";

const { ccclass, property } = _decorator;

@ccclass("EnemyManager")
export class EnemyManager extends Component {
    public static instance: EnemyManager = null;

    @property([EnemyController])
    private activatedEnemies: EnemyController[] = [];

    @property(RoomManager)
    roomManager: RoomManager;

    @property(CCInteger)
    private moveDirection: number = -1;

    private pooling: EnemyPooling = null;
    private getSpawnPosCallback: () => Vec3 = null;

    protected onLoad(): void {
        if (!EnemyManager.instance) {
            EnemyManager.instance = this;
        }

        this.pooling = this.node.getComponent(EnemyPooling);
        this.registerEvents();
    }

    protected start(): void {
        this.getSpawnPosCallback = () => SpawnPosManager.instance.getWorldSpawnPosition();
    }

    protected onEnable(): void {
        this.reset();
    }

    protected update(dt: number): void {
        if (GameManager.pauseGame) {
            return;
        }
        this.controlEnemy(dt);
    }

    protected onDestroy(): void {
        this.node.targetOff(this);
        this.roomManager.node.targetOff(this);
        EnemyManager.instance = null;
    }

    private registerEvents(): void {
        this.node.on(CEvent.ROUND.SPAWN_ENEMY, this.spawnEnemyByType, this);
        this.node.on(CEvent.ROUND.ENEMY_TAKE_DAMAGE, this.takeDamage, this);

        this.roomManager.node.on(CEvent.ROUND.INIT_ROUND, this.reset, this);
        this.roomManager.node.on(CEvent.ROUND.RESET_ROUND, this.reset, this);
    }

    private controlEnemy(dt: number): void {
        for (let index = 0; index < this.activatedEnemies.length; index++) {
            const enemy = this.activatedEnemies[index];
            if (!enemy.node.active) {
                this.activatedEnemies.splice(index, 1);
                continue;
            }
            const enemyNode = enemy.node;
            const currentPosition = enemyNode.position;
            enemyNode.setPosition(
                currentPosition.x + dt * enemy.stats.moveSpeed * this.moveDirection,
                currentPosition.y
            );
        }
    }

    public spawnEnemyByType(type: EEnemyType): void {
        this.spawn(type);
    }

    private spawn(type: EEnemyType): void {
        const worldSpawnPosition = this.getSpawnPosCallback();
        const newEnemyNode = this.pooling.getEnemy(type);
        newEnemyNode.setWorldPosition(worldSpawnPosition);
        newEnemyNode.active = true;
        this.activatedEnemies.push(newEnemyNode.getComponent(EnemyController));
    }

    private takeDamage(target: Node, damage: number): void {
        for (let enemy of this.activatedEnemies) {
            if (enemy.node !== target) {
                continue;
            }
            const bossDefeated = enemy.takeDamage(damage);
            if (bossDefeated) {
                GameManager.pauseGame = true;
                this.roomManager.endRound(ERoundStatus.WIN);
            }
            return;
        }
    }

    public reset() {
        for (let enemy of this.activatedEnemies) {
            enemy.node.active = false;
        }
        this.activatedEnemies = [];
    }
}