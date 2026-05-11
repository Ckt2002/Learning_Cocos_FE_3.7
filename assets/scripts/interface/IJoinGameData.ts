export interface IJoinGameData {
    mainBet: any;
    jackpot: IJackpotData;
    wallet: number;

}

export interface IBetOption {
    level: number;
    amount: number;
}

export interface IJackpotData {
    [key: string]: number;
}

export interface IMainBetData {
    key: string;
    value: number;
}