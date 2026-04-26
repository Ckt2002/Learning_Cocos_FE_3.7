import { _decorator, CCInteger, Component, Enum, random, Vec3 } from "cc";
import { EnemyController } from "../Enemy/EnemyController";
import { SpawnPosManager } from "./SpawnPosManager";
import { EnemyPooling } from "../Pooling/EnemyPooling";
import { EEnemyType } from "../Enum/EEnemyType";
import { randomNumber } from "../Utils/Random";

const { ccclass, property } = _decorator;

@ccclass("EnemyManager")
export class EnemyManager extends Component {
    @property([EnemyController])
    private activatedEnemies: EnemyController[] = [];

    @property({ type: [Enum(EEnemyType)] })
    private enemyTypes: EEnemyType[] = [];

    @property(CCInteger)
    private moveDirection: number = -1;

    private pooling: EnemyPooling = null;
    private getSpawnPosCallback: Function = null;

    protected onLoad(): void {
        this.pooling = this.node.getComponent(EnemyPooling);
    }

    protected start(): void {
        this.getSpawnPosCallback = () => SpawnPosManager.instance.getWorldSpawnPosition();
    }

    protected update(dt: number): void {
        this.controlEnemy(dt);
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

    public spawnNormalEnemy() {
        const randomIndex = randomNumber(0, this.enemyTypes.length - 2);
        this.spawn(randomIndex);
    }

    public spawnBoss() {
        this.spawn(this.enemyTypes.length - 1);
    }

    spawn(maxEnemyIndex: number) {
        const worldSpawnPosition = this.getSpawnPosCallback();
        const newEnemyNode = this.pooling.getEnemy(this.enemyTypes[maxEnemyIndex]);
        newEnemyNode.setWorldPosition(worldSpawnPosition);
        newEnemyNode.active = true;
        this.activatedEnemies.push(newEnemyNode.getComponent(EnemyController));
    }
}