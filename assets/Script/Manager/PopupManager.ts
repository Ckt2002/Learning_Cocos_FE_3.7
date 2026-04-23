import { _decorator, Component, Node } from 'cc';
import { mEventEmitter } from '../Event/mEventEmitter';
import { CLayerEvent } from '../Constant/CLayerEvent';
import { EPopup } from '../Enum/EPopup';
const { ccclass, property } = _decorator;

@ccclass("PopupManager")
export class PopupManager extends Component {
    @property(Node)
    popupNode: Node = null;

    @property([Node])
    popupNodes: Node[] = [];

    protected onLoad(): void {
        this.popupNode = this.node.children[0];
    }

    protected start(): void {
        this.startInit();
    }

    private startInit(): void {
        this.registerEvents();
    }

    private registerEvents(): void {
        mEventEmitter.instance.registerEvent(CLayerEvent.ENABLE_POPUP, this.enableLayer.bind(this), this);
        mEventEmitter.instance.registerEvent(CLayerEvent.DISABLE_POPUP, this.disableLayer.bind(this), this);
    }

    private enableLayer(popupType: EPopup): void {
        if (!this.popupNode.active) {
            this.popupNode.active = true;
        }
        this.popupNodes[popupType].active = true;
    }

    private disableLayer(popupType: EPopup): void {
        this.popupNode.active = false;
        this.popupNodes[popupType].active = false;
    }
}