export enum EGameState {
    START_GAME = 0, // TO LOBBY
    START_ROUND = 1, // TO ROOM

    PAUSE_ROUND = 2,
    RESUME_ROUND = 3,
    RESTART_ROUND = 4,
    QUIT_ROUND = 5,

    OPEN_SETTING = 6,
    CLOSE_SETTING = 7,

    WIN_ROUND = 8,
    LOSE_ROUND = 9,
};