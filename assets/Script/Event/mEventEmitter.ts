import { EventTarget } from "cc";

export class mEventEmitter {
    static instance: mEventEmitter | null;

    eventTarget: EventTarget;
    listenerMap: Map<any, { eventName: string | number, method: any }[]>;

    constructor() {
        if (mEventEmitter.instance) {
            return;
        }

        mEventEmitter.instance = this;
        this.eventTarget = new EventTarget();
        this.listenerMap = new Map<any, { eventName: string | number, method: any }[]>();
    }

    public registerEvent(eventName: string | number, method: any, owner: any): void {
        this.eventTarget.on(eventName, method);

        if (!this.listenerMap.has(owner)) {
            this.listenerMap.set(owner, []);
        }
        this.listenerMap.get(owner).push({ eventName, method });
    }

    public emit(eventName: string | number, ...args) {
        this.eventTarget.emit(eventName, ...args);
    }

    public removeEvent(eventName: string | number, method: any): void {
        this.eventTarget.off(eventName, method);
    }

    public removeAllOwnerEvents(owner: any): void {
        if (!this.listenerMap.has(owner)) {
            return;
        }

        const listenerArray = this.listenerMap.get(owner);
        for (let listener of listenerArray) {
            this.removeEvent(listener.eventName, listener.method);
        }
        this.listenerMap.delete(owner);
    }

    public destroy(): void {
        this.listenerMap.clear();
        this.eventTarget = null;
        mEventEmitter.instance = null;
    }
}