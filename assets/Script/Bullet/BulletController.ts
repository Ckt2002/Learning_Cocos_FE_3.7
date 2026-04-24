import { _decorator, Component, Collider2D, Contact2DType, IPhysics2DContact } from 'cc';
import { BulletConfig } from './BulletConfig';
const { ccclass, property } = _decorator;

@ccclass('BulletController')
export class BulletController extends Component {
    @property({
        type: BulletConfig,
        readonly: true,
    })
    public bulletConfig: BulletConfig;

    protected start(): void {
        const collider = this.getComponent(Collider2D);
        collider.on(Contact2DType.BEGIN_CONTACT, this.onCollisionEnter, this);
    }

    private onCollisionEnter(self: Collider2D, other: Collider2D, contact: IPhysics2DContact | null) {
        this.node.active = false;
    }
}