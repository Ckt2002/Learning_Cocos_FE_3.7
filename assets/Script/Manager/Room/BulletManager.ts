import { _decorator, Component, Enum, Node } from 'cc';
import { CharacterManager } from './CharacterManager';
import { EBulletType } from '../../Enum/EBulletType';
import { RoomManager } from '../Layer/RoomManager';
import { CharacterAnimation } from '../../Character/CharacterAnimation';
import { BulletPooling } from '../../Pooling/BulletPooling';
import { BulletController } from '../../Bullet/BulletController';
import { EnemyManager } from './EnemyManager';
import { GameManager } from '../GameManager';
import { CInputName } from '../../Constant/CInputName';
import { CRoundEvent } from '../../Constant/CRoundEvent';
import { CAnimationName } from '../../Constant/CAnimationName';
const { ccclass, property } = _decorator;

@ccclass("BulletManager")
export class BulletManager extends Component {
    public static instance: BulletManager = null;

    @property({ type: CharacterManager, visible: true })
    private characterManager: CharacterManager = null;

    @property({ type: [Enum(EBulletType)], visible: true })
    private bulletTypes: EBulletType[] = [];

    @property(RoomManager)
    roomManager: RoomManager = null;

    @property(CharacterAnimation)
    characterAnimation: CharacterAnimation = null;

    private bulletSpawnNode: Node = null;
    private enemyNode: Node = null;
    private currentBulletType: EBulletType = EBulletType.NORMAL;
    private pooling: BulletPooling = null;
    private activatedBullets: BulletController[] = [];
    private fireRate: number = 1;
    private fireCoolDown: number = 0;

    protected onLoad(): void {
        if (!BulletManager.instance) {
            BulletManager.instance = this;
        }
        this.activatedBullets = [];
        this.pooling = this.node.getComponent(BulletPooling);
        this.bulletSpawnNode = this.characterManager.characterController.firePoint;
        this.fireRate = this.characterManager.characterController.fireRate;
        this.fireCoolDown = this.fireRate;
        this.registerEvents();
    }

    protected start(): void {
        this.enemyNode = EnemyManager.instance.node;
    }

    protected update(dt: number): void {
        if (GameManager.pauseGame) {
            return;
        }
        this.fireCoolDown += dt;
        this.controlBullets(dt);
    }

    protected onDisable(): void {
        this.reset();
        this.removeEvents();
    }

    protected onDestroy(): void {
        BulletManager.instance = null;
    }

    private removeEvents() {
        this.node.targetOff(this);
        this.characterManager.node.targetOff(this);
        this.roomManager.node.targetOff(this);
    }

    private registerEvents(): void {
        this.node.on(CInputName.SWITCH_BULLET, this.switchBullet, this);
        this.node.on(CRoundEvent.ENEMY_TAKE_DAMAGE, this.causeDamage, this);

        this.characterManager.node.on(CInputName.SHOOT, this.shoot, this);

        this.roomManager.node.on(CRoundEvent.INIT_ROUND, this.reset, this);
        this.roomManager.node.on(CRoundEvent.RESET_ROUND, this.reset, this);
    }

    private shoot() {
        if (this.fireCoolDown < this.fireRate) {
            return;
        }
        this.fireCoolDown = 0;
        const bullet = this.pooling.getBullet(this.currentBulletType);
        bullet.setWorldPosition(this.bulletSpawnNode.getWorldPosition());
        bullet.active = true;
        this.activatedBullets.push(bullet.getComponent(BulletController));
        this.characterAnimation.setAnimationOne(1, CAnimationName.SHOOT);
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

    private causeDamage(target: Node, damage: number) {
        this.enemyNode.emit(CRoundEvent.ENEMY_TAKE_DAMAGE, target, damage);
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

    public reset() {
        this.currentBulletType = EBulletType.NORMAL;
        for (let bullet of this.activatedBullets) {
            bullet.node.active = false;
        }
        this.activatedBullets = [];
        this.fireCoolDown = this.fireRate;
    }
}