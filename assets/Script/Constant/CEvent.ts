export const CEvent = {
    AudioEvent: {
        SET_VOLUME: 'SET_VOLUME',
        PLAY_SFX: 'PLAY_SFX',
        STOP_ALL_AUDIOS: 'STOP_ALL_AUDIOS',
        RESET_BGM: 'RESET_BGM',
    },

    GameEvent: {
        CHANGE_STATE: "CHANGE_STATE",
    },

    LayerEvent: {
        ENABLE_LOBBY: "ENABLE_LOBBY",
        DISABLE_LOBBY: "DISABLE_LOBBY",

        ENABLE_ROOM: "ENABLE_ROOM",
        INIT_ROOM: "INIT_ROOM",
        DISABLE_ROOM: "DISABLE_ROOM",

        ENABLE_POPUP: "ENABLE_POPUP",
        DISABLE_POPUP: "DISABLE_POPUP",
    },

    RoundEvent: {
        INIT_ROUND: 'INIT_ROUND',
        RESET_ROUND: 'RESET_ROUND',

        SPAWN_ENEMY: 'SPAWN_ENEMY',
        PLAYER_TAKE_DAMAGE: 'PLAYER_TAKE_DAMAGE',
        ENEMY_TAKE_DAMAGE: 'ENEMY_TAKE_DAMAGE',
    }
} as const;