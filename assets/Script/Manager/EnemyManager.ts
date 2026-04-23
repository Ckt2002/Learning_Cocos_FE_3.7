import { _decorator, Component } from "cc";
import { EnemyController } from "../Enemy/EnemyController";

const { ccclass, property } = _decorator;

@ccclass("EnemyManager")
export class EnemyManager extends Component {

    @property([EnemyController])
    spawnedEnemies: EnemyController[] = []
}