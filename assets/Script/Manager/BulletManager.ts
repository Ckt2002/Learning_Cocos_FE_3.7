import { _decorator, Component, Node } from 'cc';
import { BulletPooling } from '../Pooling/BulletPooling';
import { EBulletType } from '../Enum/EBulletType';
import { BulletController } from '../Bullet/BulletController';
import { CInputName } from '../Constant/CInputName';
import { CharacterManager } from './CharacterManager';
const { ccclass, property } = _decorator;

@ccclass("BulletManager")
export class BulletManager extends Component {
    @property({
        type: CharacterManager,
        visible: true,
    })
    private characterManager: CharacterManager = null;

    private bulletSpawnNode: Node = null;
    private currentBulletType: EBulletType = EBulletType.NORMAL;
    private pooling: BulletPooling = null;
    public activatedBullets: BulletController[] = [];

    protected onLoad(): void {
        this.activatedBullets = [];
        this.pooling = this.node.getComponent(BulletPooling);
        this.characterManager.node.on(CInputName.SHOOT, this.shoot.bind(this), this);
        this.bulletSpawnNode = this.characterManager.characterController.firePoint;
    }

    protected update(dt: number): void {
        this.controlBullets(dt);
    }

    private shoot() {
        const bullet = this.pooling.getBullet(this.currentBulletType);
        bullet.setWorldPosition(this.bulletSpawnNode.getWorldPosition());
        bullet.active = true;
        this.activatedBullets.push(bullet.getComponent(BulletController));
    }

    private controlBullets(dt: number) {
        for (let index = 0; index < this.activatedBullets.length; index++) {
            const bullet = this.activatedBullets[index];
            if (!bullet.node.active) {
                this.activatedBullets.splice(index, 1);
                continue;
            }

            const newPosition = bullet.node.position;
            bullet.node.setPosition(newPosition.x + bullet.bulletConfig.moveSpeed * dt, newPosition.y);
        }
    }
}