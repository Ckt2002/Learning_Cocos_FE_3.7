import { _decorator, Component, Node, random, Sprite, SpriteFrame, tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ReelController')
export class ReelController extends Component {
    @property([SpriteFrame])
    symbolSpriteFrames: SpriteFrame[] = [];

    resultSymbols: number[] = [];
    symbols: Node[] = [];
    bottomLimit: number = 65;
    originalPosition: Vec3;
    step: number = 10;
    resultIndex: number = 0;

    protected onLoad(): void {
        this.symbols = this.node.children;
        this.originalPosition = this.node.getPosition();
    }

    setupResultSymbols(value: number) {
        this.resultSymbols.push(value);
    }

    clearResultSymbols() {
        this.resultSymbols = [];
    }

    randomSymbol() {
        const randomIndex = Math.floor(Math.random() * (this.symbolSpriteFrames.length - 1));
        this.symbols[0].getComponent(Sprite).spriteFrame = this.symbolSpriteFrames[randomIndex];
    }

    specificSymbol() {
        const result = this.resultSymbols[this.resultIndex] - 2;
        this.symbols[0].getComponent(Sprite).spriteFrame = this.symbolSpriteFrames[result];
        this.resultIndex++;
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
        if (this.step === 4) {
            this.endSpin();
            return;
        }
        this.step--;
        tween(this.node)
            .by(0.1, { position: new Vec3(0, -154) }, {
                onComplete: () => {
                    this.onReorder(this.randomSymbol.bind(this));
                    this.loopSpin();
                }
            }).start();
    }

    private endSpin() {
        if (this.step === 0) {
            this.step = 10;
            return;
        }
        this.step--;
        tween(this.node)
            .by(0.1, { position: new Vec3(0, -154) }, {
                onComplete: () => {
                    if (this.step >= 1) {
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
}