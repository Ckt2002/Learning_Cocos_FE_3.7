import { _decorator, Collider2D, Component, Contact2DType, IPhysics2DContact, Node } from "cc";
import { CharacterManager } from "../Manager/Room/CharacterManager";
import { CRoundEvent } from "../Constant/CRoundEvent";
import { EnemyController } from "../Enemy/EnemyController";

const { ccclass, property } = _decorator;

@ccclass
export class TakeDamageController extends Component {

    @property(Node)
    characterNode: Node;

    protected start(): void {
        this.characterNode = CharacterManager.instance.node;
        const collider = this.node.getComponent(Collider2D);
        collider.on(Contact2DType.BEGIN_CONTACT, this.onCollisionEnter, this);
    }

    private onCollisionEnter(self: Collider2D, other: Collider2D, contact: IPhysics2DContact | null) {
        other.node.active = false;
        const damage = other.getComponent(EnemyController).damage;
        this.characterNode.emit(CRoundEvent.PLAYER_TAKE_DAMAGE, damage);
    }
}