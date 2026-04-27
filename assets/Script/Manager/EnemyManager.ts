import { _decorator, CCInteger, Component, Enum, random, Vec3 } from "cc";
import { EnemyController } from "../Enemy/EnemyController";
import { SpawnPosManager } from "./SpawnPosManager";
import { EnemyPooling } from "../Pooling/EnemyPooling";
import { EEnemyType } from '../Enum/EEnemyType';
import { CRoundEvent } from "../Constant/CRoundEvent";

const { ccclass, property } = _decorator;

@ccclass("EnemyManager")
export class EnemyManager extends Component {
    public static instance: EnemyManager = null;
    @property([EnemyController])
    private activatedEnemies: EnemyController[] = [];

    @property(CCInteger)
    private moveDirection: number = -1;

    private pooling: EnemyPooling = null;
    private getSpawnPosCallback: () => Vec3 = null;

    protected onLoad(): void {
        if (!EnemyManager.instance) {
            EnemyManager.instance = this;
        }

        this.pooling = this.node.getComponent(EnemyPooling);
        this.node.on(CRoundEvent.SPAWN_ENEMY, this.spawnEnemyByType, this);
    }

    protected start(): void {
        this.getSpawnPosCallback = () => SpawnPosManager.instance.getWorldSpawnPosition();
    }

    protected update(dt: number): void {
        this.controlEnemy(dt);
    }

    protected onDestroy(): void {
        this.node.off(CRoundEvent.SPAWN_ENEMY, this.spawnEnemyByType);
    }

    private controlEnemy(dt: number) {
        for (let index = 0; index < this.activatedEnemies.length; index++) {
            const enemy = this.activatedEnemies[index];
            if (!enemy.node.active) {
                this.activatedEnemies.splice(index, 1);
                continue;
            }

            const enemyNode = enemy.node;
            const currentPosition = enemyNode.position;
            enemyNode.setPosition(
                currentPosition.x + dt * enemy.moveSpeed * this.moveDirection,
                currentPosition.y
            );
        }
    }

    public spawnEnemyByType(type: EEnemyType) {
        this.spawn(type);
    }

    spawn(type: EEnemyType) {
        const worldSpawnPosition = this.getSpawnPosCallback();
        const newEnemyNode = this.pooling.getEnemy(type);
        newEnemyNode.setWorldPosition(worldSpawnPosition);
        newEnemyNode.active = true;
        this.activatedEnemies.push(newEnemyNode.getComponent(EnemyController));
    }
}