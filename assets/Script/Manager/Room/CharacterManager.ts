import { _decorator, Component, Node } from 'cc';
import { CharacterController } from '../../Character/CharacterController';
import { CInputName } from '../../Constant/CInputName';
import { CRoundEvent } from '../../Constant/CRoundEvent';
import { GameManager } from '../GameManager';
import { RoomManager } from '../Layer/RoomManager';
import { ERoundStatus } from '../../Enum/ERoundStatus';
import { CharacterAnimation } from '../../Character/CharacterAnimation';
import { ICharacterState } from '../../Character/ICharacterState';
import { PortalState } from '../../Character/PortalState';
import { ICharacter } from '../../Character/ICharacter';
const { ccclass, property } = _decorator;

@ccclass('CharacterManager')
export class CharacterManager extends Component implements ICharacter {

    public static instance: CharacterManager = null;

    @property(CharacterController)
    characterController: CharacterController = null;

    @property(CharacterAnimation)
    characterAnimation: CharacterAnimation = null;

    @property(RoomManager)
    roomManager: RoomManager = null;

    @property(Node)
    bulletManagerNode: Node = null;

    public moveDirectionY: number = 0;
    private timeOutObject: any = null;
    private currentState: ICharacterState = null;

    protected onLoad(): void {
        if (!CharacterManager.instance) CharacterManager.instance = this;
    }

    protected start(): void {
        this.registerEvents();
        this.reset();
    }

    protected onEnable(): void {
        this.reset();
    }

    protected update(dt: number): void {
        if (GameManager.pauseGame) return;
        this.currentState?.onUpdate(this, dt);
    }

    protected onDestroy(): void {
        this.node.targetOff(this);
        this.roomManager.node.targetOff(this);
        this.clearDeadTimeout();
        CharacterManager.instance = null;
    }

    private registerEvents(): void {
        this.node.on(CInputName.MOVE_UP, this.setDirection, this);
        this.node.on(CInputName.MOVE_DOWN, this.setDirection, this);
        this.node.on(CInputName.STOP_MOVING, this.setDirection, this);
        this.node.on(CInputName.SWITCH_BULLET, this.onSwitchBullet, this);
        this.node.on(CRoundEvent.PLAYER_TAKE_DAMAGE, this.takeDamage, this);

        this.roomManager.node.on(CRoundEvent.INIT_ROUND, this.reset, this);
        this.roomManager.node.on(CRoundEvent.RESET_ROUND, this.reset, this);
    }

    public changeState(next: ICharacterState): void {
        this.currentState?.onExit(this);
        this.currentState = next;
        this.currentState.onEnter(this);
    }

    private setDirection(direction: number): void {
        console.log(direction)
        this.moveDirectionY = direction;
    }

    private onSwitchBullet(): void {
        this.bulletManagerNode.emit(CInputName.SWITCH_BULLET);
    }

    private takeDamage(value: number): void {
        this.currentState?.onTakeDamage?.(this, value);
    }

    public onDead(): void {
        this.timeOutObject = setTimeout(() => {
            this.roomManager.endRound(ERoundStatus.LOSE);
        }, 3000);
    }

    private clearDeadTimeout(): void {
        if (this.timeOutObject) {
            clearTimeout(this.timeOutObject);
            this.timeOutObject = null;
        }
    }

    public reset(): void {
        this.clearDeadTimeout();
        this.moveDirectionY = 0;
        this.characterController.reset();
        this.changeState(new PortalState());
    }
}