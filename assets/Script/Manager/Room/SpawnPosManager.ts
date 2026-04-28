import { _decorator, Component, Node, Vec3 } from "cc";
import { randomNumber } from "../../Utils/Random";

const { ccclass, property } = _decorator;

@ccclass('SpawnPosManager')
export class SpawnPosManager extends Component {
    public static instance: SpawnPosManager;

    @property([Node])
    private spawnPositions: Node[] = [];

    protected onLoad(): void {
        if (!SpawnPosManager.instance) {
            SpawnPosManager.instance = this;
        }
    }

    public getWorldSpawnPosition(): Vec3 {
        const randomIndex = randomNumber(0, this.spawnPositions.length - 1);
        return this.spawnPositions[randomIndex].worldPosition;
    }
}