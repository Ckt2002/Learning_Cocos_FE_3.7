import { _decorator, Component, random } from "cc";

const { ccclass, property } = _decorator;

@ccclass("Test")
export class Test extends Component implements ITest {

    test1(): void {
        console.log("Hello");
    }
    test2(): number {
        return Math.random() * (10 - 1) + 1;
    }
}