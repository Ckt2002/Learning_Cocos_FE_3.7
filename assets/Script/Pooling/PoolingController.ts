import { _decorator, Component, instantiate, Node, Prefab } from 'cc';

const { ccclass, property } = _decorator;

@ccclass("SpawnInformation")
export class SpawnInformation {
    @property(Prefab)
    public prefab: Prefab = null!;

    @property
    public spawnNumber: number = 0;
}

@ccclass("PoolingController")
export class PoolingController extends Component {
    @property([SpawnInformation])
    public prefabs: SpawnInformation[] = [];

    private nodeMap: Map<number, [Node]>;

    protected onLoad(): void {
        this.nodeMap = new Map();
    }

    public spawn() {
        for (let detail of this.prefabs) {
            for (let index = 0; index < detail.spawnNumber; index++) {
                const newNode = instantiate(detail.prefab);
                newNode.parent = this.node;
            }
        }
    }
}