import { _decorator, CCInteger, Component } from "cc";

const { ccclass, property } = _decorator;

@ccclass("EnemyController")
export class EnemyController extends Component {

    @property({
        group: { name: "Stats" },
        type: CCInteger,
        visible: true,
    })
    public moveSpeed: number = 200;
}