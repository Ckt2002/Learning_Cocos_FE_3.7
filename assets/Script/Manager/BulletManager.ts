import { _decorator, Component } from 'cc';
import { BulletPooling } from '../Pooling/BulletPooling';
import { EBulletType } from '../Enum/EBulletType';
import { BulletController } from '../Bullet/BulletController';
const { ccclass, property } = _decorator;

@ccclass("BulletManager")
export class BulletManager extends Component {
    private currentBulletType: EBulletType = EBulletType.NORMAL;
    private bulletPooling: BulletPooling = null;
    public activatedBullets: BulletController[] = [];

    protected onLoad(): void {
        this.activatedBullets = [];
        this.bulletPooling = this.node.getComponent(BulletPooling);
    }

    protected start(): void {
        const bullet = this.bulletPooling.getBullet(this.currentBulletType);
        bullet.active = true;
        this.activatedBullets.push(bullet.getComponent(BulletController));
    }

    protected update(dt: number): void {
        this.controlBullets(dt);
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