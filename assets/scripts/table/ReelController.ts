import { _decorator, Component, Node, random, Sprite, SpriteFrame, tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ReelController')
export class ReelController extends Component {
    @property([SpriteFrame])
    symbolSpriteFrames: SpriteFrame[] = [];

    onSpinCompleted: Function = null;

    private resultSymbols: number[] = [];
    private symbols: Node[] = [];
    private bottomLimit: number = 65;
    private maxStep: number = 20;
    private currentStep: number;
    private resultIndex: number = 0;

    protected onLoad(): void {
        this.symbols = this.node.children;
    }

    setupStep(offset: number) {
        this.maxStep += offset;
        this.currentStep = this.maxStep;
    }

    setupResultSymbol(resultSymbol: number) {
        this.resultSymbols.push(resultSymbol);
    }

    clearResultSymbols() {
        this.resultSymbols = [];
    }

    spin() {
        this.resultIndex = 0;
        this.startSpin();
        this.scheduleOnce(() => {
            this.loopSpin();
        }, 0.5)
    }

    private startSpin() {
        tween(this.node)
            .by(0.5, { position: new Vec3(0, -50) }, { easing: 'backIn' })
            .start();
    }

    private loopSpin() {
        if (this.currentStep === 4) {
            this.endSpin();
            return;
        }
        this.currentStep--;
        tween(this.node)
            .by(0.1, { position: new Vec3(0, -154) }, {
                onComplete: () => {
                    this.onReorder(this.randomSymbol.bind(this));
                    this.loopSpin();
                }
            }).start();
    }

    private endSpin() {
        if (this.currentStep === 0) {
            this.currentStep = this.maxStep;
            this.onSpinCompleted?.();
            return;
        }
        this.currentStep--;
        tween(this.node)
            .by(0.1, { position: new Vec3(0, -154) }, {
                onComplete: () => {
                    if (this.currentStep >= 1) {
                        this.onReorder(this.specificSymbol.bind(this));
                    } else {
                        this.onReorder(this.randomSymbol.bind(this));
                    }
                    this.endSpin();
                }
            }).start();
    }

    private onReorder(assignSymbol: Function): void {
        for (let symbol of this.symbols) {
            if (symbol.worldPosition.y <= this.bottomLimit) {
                symbol.setSiblingIndex(0);
                this.node.setPosition(new Vec3(this.node.position.x, 0));

                assignSymbol();

                break;
            }
        }
    }

    randomSymbol() {
        const randomIndex = Math.floor(Math.random() * (this.symbolSpriteFrames.length - 1));
        this.symbols[0].getComponent(Sprite).spriteFrame = this.symbolSpriteFrames[randomIndex];
    }

    specificSymbol() {
        const index = this.resultSymbols[this.resultIndex] - 2;
        this.symbols[0].getComponent(Sprite).spriteFrame = this.symbolSpriteFrames[index];
        this.resultIndex++;
    }
}