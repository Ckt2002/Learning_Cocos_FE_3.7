import { _decorator, Component, Node } from 'cc';
import { ButtonManager } from './ButtonManager';
import { mEventEmitter } from '../Event/mEventEmitter';
import { EButtonEvent } from '../Enum/EButtonEvent';

const { ccclass, property } = _decorator;

@ccclass("BaseLayerManager")
export abstract class BaseLayerManager<T> extends Component {
    @property(Node)
    protected container: Node = null;

    @property({ type: ButtonManager, visible: false })
    protected buttonManager: ButtonManager = null;

    protected onLoad(): void {
        this.container = this.node.children[0];
        this.buttonManager = this.node.getComponent(ButtonManager);
    }

    protected start(): void {
        this.startInit();
    }

    protected onDestroy(): void {
        mEventEmitter.instance.removeAllOwnerEvents(this);
    }

    protected startInit(): void {
        this.registerEvents();
        this.setupButtonManager();
    }

    protected setupButtonManager() {
        this.buttonManager.setupTargetNodeEvent(this.node);
    }

    protected registerEvents(): void {
        this.node.on('ButtonEvent', this.layerEventHandler.bind(this), this);
    }

    protected enableContainer(param?: T): void {
        if (!this.container.active) {
            this.container.active = true;
        }
    }

    protected disableContainer(param?: T): void {
        this.container.active = false;
    }

    protected layerEventHandler(buttonEvent: EButtonEvent) {
    }
}