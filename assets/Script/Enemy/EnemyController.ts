import { _decorator, CCInteger, Component } from "cc";

const { ccclass, property } = _decorator;

@ccclass("EnemyController")
export class EnemyController extends Component {

    @property({
        group: { name: "Stats" },
        type: CCInteger,
    })
    public moveSpeed: number = 200;

    @property({
        group: { name: "Stats" },
        type: CCInteger,
    })
    public damage: number = 10;
}