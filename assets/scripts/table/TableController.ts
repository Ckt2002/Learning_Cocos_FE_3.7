import { _decorator, Component, director } from 'cc';
import { GameEventManager } from '../core/GameEventManager';
import { IBetData } from '../interface/IBetData';
import { ReelController } from './ReelController';
import { CEvent } from '../constant/CEvent';
const { ccclass, property } = _decorator;

@ccclass('TableController')
export class TableController extends Component {
    @property(GameEventManager)
    gameEvent: GameEventManager = null;

    @property([ReelController])
    reels: ReelController[] = [];

    countCompleted: number = 0;
    betData: IBetData = null;

    protected onLoad(): void {
        this.gameEvent.on("SPIN_REQUEST", this.onSpin, this);
    }

    protected start(): void {
        for (let reel of this.reels) {
            reel.onSpinCompleted = this.completedSpin.bind(this);
        }
    }

    private onSpin(data: any) {
        this.countCompleted = 0;
        this.setupResultSymbols(data as IBetData);
        this.runSpin();
    }

    private runSpin() {
        for (let reel of this.reels) {
            reel.spin();
        }
    }

    private setupResultSymbols(data: IBetData) {
        this.betData = data;
        const matrix = this.betData.matrix as number[];
        let reelIndex = 0;
        let reelCount = 0;

        for (let reel of this.reels) {
            reel.clearResultSymbols();
        }

        for (let index = 0; index < matrix.length; index++) {
            if (reelCount === 3) {
                reelCount = 0;
                reelIndex++;
            }
            reelCount++;
            this.reels[reelIndex].setupResultSymbols(matrix[index]);
        }
    }

    private completedSpin() {
        this.countCompleted++;

        if (this.countCompleted === 5) {
            this.onCompleted();
        }
    }

    private onCompleted() {
        director.emit(CEvent.Game.COMPLETED, this.betData.winAmount);
    }
}