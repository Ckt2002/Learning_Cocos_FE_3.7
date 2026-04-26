import { _decorator, Component, Enum, instantiate, Node } from 'cc';
import { SpawnInformation } from '../Spawn/SpawnInformation';

const { ccclass } = _decorator;

@ccclass("PoolingController")
export abstract class PoolingController<TInfo extends SpawnInformation> extends Component {
    private nodeMap: Map<number, Node[]>;

    protected onLoad(): void {
        this.nodeMap = new Map();
        this.spawn();
    }

    protected getPrefabInformation(): TInfo[] {
        return [];
    };

    public spawn() {
        for (let detail of this.getPrefabInformation()) {
            for (let index = 0; index < detail.spawnNumber; index++) {
                const newNode = instantiate(detail.prefab);
                newNode.parent = this.node;
                newNode.active = false;
                this.assignToMap(detail.getType(), newNode);
            }
        }
    }

    protected assignToMap(type: number, newNode: Node) {
        if (!this.nodeMap.has(type)) {
            this.nodeMap.set(type, []);
        }
        this.nodeMap.get(type).push(newNode);
    }

    protected getNode(type: number) {
        const nodeArray = this.nodeMap.get(type);
        for (let node of nodeArray) {
            if (!node.active) {
                return node;
            }
        }

        this.spawn();
        return this.getNode(type);
    }
}