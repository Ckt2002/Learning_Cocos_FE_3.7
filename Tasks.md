# Cocos 3

## 🐺 Enemies

| Enemy           | Movement | Damage  | Health  | Coin      |
| --------------- | -------- | ------- | ------- | --------- |
| Wolf            | Fast     | Low     | Low     | Low       |
| Two-Headed Wolf | Average  | Average | Average | Average   |
| Dragon          | Slow     | Average | High    | High      |
| Boss            | Slow     | High    | High    | Very High |

---

## 🧑‍🦯 Player

- Move: Up / Down / Left / Right
- Actions: Fire, Switch Bullet

---

## 🔫 Bullets

| Type                | Damage  | Speed   | Special                   |
| ------------------- | ------- | ------- | ------------------------- |
| Normal              | Average | Average | —                         |
| Slow                | Low     | Average | Slows down enemy          |
| Area Damage         | Average | Slow    | Explodes in an area       |
| AP (Armor Piercing) | High    | High    | Pierces through 3 enemies |

---

## 🏰 Towers _(Additional)_

> Towers can be attacked by enemies.

| Type   | Cost      | Damage  | Health  | Special             |
| ------ | --------- | ------- | ------- | ------------------- |
| Normal | Cheap     | Average | Average | —                   |
| Fire   | Average   | High    | Low     | Explodes in an area |
| Tank   | Expensive | Low     | High    | —                   |

---

## 🏗️ Structure

```
GameManager, EventEmitter, AudioManager
├── LobbyManager
├── RoomManager, RoundManager
│   ├── CharacterManager, Pooling
│   │   ├── CharacterController
│   │   ├── CharacterController
│   │   └── CharacterController
│   ├── EnemyManager, Pooling
│   │   ├── EnemyController
│   │   ├── EnemyController
│   │   └── EnemyController
│   ├── BulletManager, Pooling
│   │   ├── BulletController
│   │   ├── BulletController
│   │   └── BulletController
│   ├── TowerManager, Pooling (Additional)
│   │   ├── TowerController
│   │   ├── TowerController
│   │   └── TowerController
│   └── EffectManager, Pooling
│       ├── EffectController
│       ├── EffectController
│       └── EffectController
└── PopupManager
    ├── Popup
    ├── Popup
    └── Popup
```

---

## 🔄 States

### Character & Enemy

`Idle` → `Move` → `Attack` → `Take Damage` → `Debuff` → `Die`

### Tower

`Idle` → `Attack` → `Take Damage` → `Die`

### Bullet

`Fly` → `Explode` → `Despawn`

### Total Game Flow

```
Lobby
 └── Room
      ├── Init
      ├── Start
      ├── Pause
      ├── Result
      └── Exit
```
