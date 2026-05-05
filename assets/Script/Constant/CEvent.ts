export const CEvent = {
    GAME: {
        CHANGE_STATE: 'CHANGE_STATE',
    },

    SCENE: {
        CHANGE_SCENE: 'CHANGE_SCENE',
    },

    AUDIO: {
        SET_VOLUME: 'SET_VOLUME',
        PLAY_SFX: 'PLAY_SFX',
        STOP_ALL_AUDIOS: 'STOP_ALL_AUDIOS',
        RESET_BGM: 'RESET_BGM',
    },

    LAYER: {
        ENABLE_LOBBY: 'ENABLE_LOBBY',
        DISABLE_LOBBY: 'DISABLE_LOBBY',

        ENABLE_ROOM: 'ENABLE_ROOM',
        INIT_ROOM: 'INIT_ROOM',
        DISABLE_ROOM: 'DISABLE_ROOM',

        ENABLE_POPUP: 'ENABLE_POPUP',
        DISABLE_POPUP: 'DISABLE_POPUP',
    },

    ROUND: {
        INIT_ROUND: 'INIT_ROUND',
        RESET_ROUND: 'RESET_ROUND',

        SPAWN_ENEMY: 'SPAWN_ENEMY',
        PLAYER_TAKE_DAMAGE: 'PLAYER_TAKE_DAMAGE',
        ENEMY_TAKE_DAMAGE: 'ENEMY_TAKE_DAMAGE',

        PAUSE: 'PAUSE',
        RESUME: 'RESUME',
        RESTART: 'RESTART',
    },

    BUTTON: {
        BUTTON_EVENT: 'BUTTON_EVENT',
        MAIN: 'MAIN',
        OPEN_INVENTORY: 'OPEN_INVENTORY',

        START: 'START',
        PAUSE: 'PAUSE',
        RESUME: 'RESUME',
        RESTART: 'RESTART',
        QUIT: 'QUIT',

        OPEN_SETTING: 'OPEN_SETTING',
        CLOSE_SETTING: 'CLOSE_SETTING',
    },
} as const;