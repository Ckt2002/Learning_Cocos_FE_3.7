import { _decorator, CCFloat, CCInteger, Component, Node, Vec2, ViewGroup } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CharacterController')
export class CharacterController extends Component {
    @property({
        group: { name: "Stats" },
        type: CCInteger,
        visible: true,
    })
    public moveSpeed: number = 200;

    @property({
        group: { name: "Stats" },
        type: CCFloat,
        visible: true,
    })
    public fireRate: number = 0.5;

    @property({
        group: { name: "Limit" },
        visible: true,
    })
    public limitVertical: Vec2 = new Vec2();

    @property(Node)
    public firePoint: Node = null;
}