import { _decorator, Component, random } from "cc";
import { Test } from "./Test";

const { ccclass } = _decorator;

@ccclass("TestCall")
export class TestCall extends Component {
    private test: ITest = null;

    protected onLoad(): void {
        this.test = this.node.getComponent(Test) as ITest;
    }

    protected start(): void {
        this.test.test1();
    }
}