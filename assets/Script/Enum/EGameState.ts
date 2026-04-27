export enum EGameState {
    START_GAME = 0, // TO LOBBY
    START_ROUND = 2, // TO ROOM

    PAUSE_GAME = 3,
    RESUME_GAME = 4,
    QUIT_GAME = 5,

    OPEN_SETTING = 6,
    CLOSE_SETTING = 7,

    WIN_ROUND = 8,
    LOSE_ROUND = 9,
};