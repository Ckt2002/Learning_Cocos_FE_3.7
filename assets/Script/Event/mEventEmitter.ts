import { EventTarget } from "cc";

export class mEventTarget {
    static instance: mEventTarget | null;

    eventTarget: EventTarget;
    listenerMap: Map<any, { eventName: string, method: any }[]>;

    constructor() {
        if (mEventTarget.instance) {
            return;
        }

        mEventTarget.instance = this;
        this.eventTarget = new EventTarget();
        this.listenerMap = new Map<any, { eventName: string, method: any }[]>();
    }

    registerEvent(eventName: string, method: any, owner: any) {
        this.eventTarget.on(eventName, method);
    }
}