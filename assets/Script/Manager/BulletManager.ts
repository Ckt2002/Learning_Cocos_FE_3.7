import { _decorator, Component, Enum, Node, instantiate } from 'cc';
import { BulletPooling } from '../Pooling/BulletPooling';
import { EBulletType } from '../Enum/EBulletType';
import { BulletController } from '../Bullet/BulletController';
import { CInputName } from '../Constant/CInputName';
import { CharacterManager } from './CharacterManager';
const { ccclass, property } = _decorator;

@ccclass("BulletManager")
export class BulletManager extends Component {
    public static instance: BulletManager = null;

    @property({
        type: CharacterManager,
        visible: true,
    })
    private characterManager: CharacterManager = null;

    @property({
        type: [Enum(EBulletType)],
        visible: true,
    })
    private bulletTypes: EBulletType[] = [];

    private bulletSpawnNode: Node = null;
    private currentBulletType: EBulletType = EBulletType.NORMAL;
    private pooling: BulletPooling = null;
    public activatedBullets: BulletController[] = [];

    protected onLoad(): void {
        if (!BulletManager.instance) {
            BulletManager.instance = this;
        }

        this.activatedBullets = [];
        this.pooling = this.node.getComponent(BulletPooling);
        this.bulletSpawnNode = this.characterManager.characterController.firePoint;

        this.characterManager.node.on(CInputName.SHOOT, this.shoot, this);
        this.node.on(CInputName.SWITCH_BULLET, this.switchBullet, this);
    }

    protected update(dt: number): void {
        this.controlBullets(dt);
    }

    protected onDestroy(): void {
        this.characterManager.node.off(CInputName.SHOOT, this.shoot, this);
        this.node.off(CInputName.SWITCH_BULLET, this.switchBullet);
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

    private switchBullet() {
        let currentIndex = this.bulletTypes.indexOf(this.currentBulletType);
        if (currentIndex === this.bulletTypes.length - 1) {
            currentIndex = 0;
        } else {
            currentIndex++;
        }

        this.currentBulletType = this.bulletTypes[currentIndex];
    }
}