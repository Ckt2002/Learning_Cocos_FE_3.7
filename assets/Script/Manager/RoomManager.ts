import { _decorator, Component, Node } from 'cc';
import { mEventEmitter } from '../Event/mEventEmitter';
import { CLayerEvent } from '../Constant/CLayerEvent';
const { ccclass, property } = _decorator;


@ccclass("RoomManager")
export class RoomManager extends Component {
    @property(Node)
    roomNode: Node = null;

    protected onLoad(): void {
        this.roomNode = this.node.children[0];
    }

    protected start(): void {
        this.startInit();
    }

    private startInit(): void {
        this.registerEvents();
    }

    private registerEvents(): void {
        mEventEmitter.instance.registerEvent(CLayerEvent.ENABLE_ROOM, this.enableLayer.bind(this), this);
        mEventEmitter.instance.registerEvent(CLayerEvent.DISABLE_ROOM, this.disableLayer.bind(this), this);
    }

    private enableLayer(): void {
        this.roomNode.active = true;
    }

    private disableLayer(): void {
        this.roomNode.active = false;
    }
}