import { _decorator, Prefab } from 'cc';

const { ccclass, property } = _decorator;

@ccclass("SpawnInformation")
export abstract class SpawnInformation {
    @property(Prefab)
    public prefab: Prefab = null;

    @property
    public spawnNumber: number = 0;

    public getType(): number { return -1; }
}