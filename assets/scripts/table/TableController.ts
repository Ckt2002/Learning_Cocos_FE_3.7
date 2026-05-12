import { _decorator, Component } from 'cc';
import { GameEventManager } from '../core/GameEventManager';
import { IBetData } from '../interface/IBetData';
import { ReelController } from './ReelController';
const { ccclass, property } = _decorator;

@ccclass('TableController')
export class TableController extends Component {
    @property(GameEventManager)
    gameEvent: GameEventManager = null;

    @property([ReelController])
    reels: ReelController[] = [];

    countCompleted: number = 0;

    protected onLoad(): void {
        this.gameEvent.on("SPIN_REQUEST", this.onSpin, this);
    }

    private onSpin(data: any) {
        this.setupResultSymbols(data as IBetData);
        this.runSpin();
    }

    private runSpin() {
        for (let reel of this.reels) {
            this.scheduleOnce(() => {
                reel.spin();
            }, 1);
        }
    }

    private setupResultSymbols(data: IBetData) {
        const betData = data;
        const matrix = betData.matrix as number[];
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

        }
    }
}