# Design Patterns

---

# 🧩 Command Pattern

## 📌 1. Khái niệm

- Command Pattern là một trong những Behavioral Design Pattern.
- Command Pattern biến một yêu cầu (request) thành một đối tượng độc lập (gọi là Command), sau đó có thể truyền, lưu trữ, xếp hàng, hoặc thực thi yêu cầu đó sau.

## 🧠 2. Cấu trúc cơ bản

### Thành phần:

- **Command (interface / abstract class)**  
  Định nghĩa method `execute()` (và có thể `undo()`)

- **ConcreteCommand**  
  Cài đặt logic cụ thể, gọi đến Receiver

- **Receiver**  
  Thực hiện hành động thực sự

- **Invoker**  
  Gọi command (button, input handler, AI system...)

- **Client**  
  Tạo và gán command

## ⚙️ 3. Khi nào nên sử dụng?

Sử dụng khi bạn cần **tách người gửi yêu cầu và người xử lý**:

### 🔄 Undo / Redo

- Lưu lại lịch sử command
- Cho phép rollback trạng thái

### 📜 Logging / Replay

- Ghi lại hành động để debug, audit
- Replay lại game/session

### 🧱 Macro / Composite Command

- Gom nhiều command thành một
- Ví dụ: `"Save All & Exit"`

### 🎮 Input / UI / Game Control

- Map phím → command
- Dễ thay đổi control scheme

### 🌐 Queue / Networking / Async

- Đưa command vào queue
- Gửi qua network (multiplayer)

### 💳 Transaction System

- Database / Banking
- Có thể rollback nếu lỗi

## 🚫 4. Khi nào KHÔNG nên dùng?

Không phải lúc nào cũng nên áp dụng:

- ❌ Logic quá đơn giản (chỉ gọi 1 method)
- ❌ Không cần undo, queue, hay logging
- ❌ Prototype / project nhỏ
- ❌ Over-engineering → code khó đọc hơn

## 🎮 5. Ứng dụng trong Game

Command Pattern rất phổ biến trong game dev:

### 🎹 Input Handling

- Remap phím (keyboard, controller)
- Gán action → command thay vì hardcode

### ↩️ Undo / Replay System

- Replay game (RTS, turn-based)
- Debug gameplay

### 📦 Queue & Networking

- Gửi command thay vì state
- Giảm bandwidth, dễ sync

### 🤖 AI System

- AI dùng cùng command với player
- Không cần logic riêng

### ⚔️ Skill / Combo System

- Chain command để tạo combo
- Script behavior phức tạp

---

## 🧩 Flyweight Pattern

## 📌 1. Khái niệm

Flyweight Pattern là mẫu thiết kế thuộc nhóm behavioral/structural (thường xếp vào structural) trong OOP, dùng để tối ưu bộ nhớ khi có rất nhiều object giống nhau trong game.

## 🧠 2. Cấu trúc cơ bản

### Thành phần:

- **Flyweight (interface/class)**  
  Chứa logic sử dụng intrinsic state

- **ConcreteFlyweight**  
  Lưu intrinsic state (shared data)

- **FlyweightFactory**
  - Quản lý và cache flyweight
  - Đảm bảo reuse thay vì tạo mới

- **Client**
  - Cung cấp extrinsic state khi sử dụng

## ⚙️ 3. Khi nào nên sử dụng?

Áp dụng khi hệ thống có **rất nhiều object giống nhau**:

- Hàng ngàn → hàng triệu object
- Object có **data nặng**:
  - Mesh
  - Texture
  - Model

### 🎮 Phù hợp với các thể loại game:

- 🌍 Open World
- ⚔️ RTS (Real-time Strategy)
- 🧪 Simulation

## 🚫 4. Khi nào KHÔNG nên dùng?

Không phải lúc nào cũng phù hợp:

- ❌ Số lượng object ít (vài chục / vài trăm)
- ❌ Object có nhiều state riêng:
  - NPC có AI riêng
  - Inventory khác nhau
  - Weapon có random stats
- ❌ Cần mutable state trực tiếp trong object
  - Thay đổi → ảnh hưởng tất cả instance
- ❌ Project nhỏ / prototype

## 🎮 6. Ứng dụng trong Game

### 🎨 Rendering (Instancing)

- Render hàng ngàn object giống nhau
- Nền tảng của **GPU Instancing**
- Giảm draw call và memory

### 🟩 Tile-based Game

- Map gồm các tile: grass, water, stone
- Chỉ tạo **1 object cho mỗi loại tile**
- Map lưu:
  - Tile ID
  - Position

### 💥 Bullet / Particle System

- Hàng ngàn viên đạn / particle
- Kết hợp với **Object Pooling**
- Shared:
  - Mesh / material
- Riêng:
  - Position / velocity / lifetime

---

# 🧩 Observer Pattern

## 📌 1. Khái niệm

Observer Pattern là một mẫu thiết kế thuộc nhóm behavioral trong OOP. Nó định nghĩa quan hệ 1–n giữa các object: khi một object (Subject) thay đổi trạng thái, tất cả các object phụ thuộc (Observers) sẽ được thông báo tự động.

## 🧠 2. Cấu trúc cơ bản

- **Subject**
  - Lưu danh sách observers
  - Cung cấp:
    - `attach()`
    - `detach()`
    - `notify()`

- **Observer (interface)**
  - Định nghĩa method `update()`

- **ConcreteObserver**
  - Cài đặt logic khi nhận thông báo

## ⚙️ 3. Khi nào nên sử dụng?

Sử dụng khi bạn cần **nhiều hệ thống phản ứng với cùng một sự kiện**:

### 🔔 Event-driven System

- Kiến trúc dựa trên event
- Giảm coupling giữa các hệ thống

### 🎮 Game Events

- Enemy chết →
  - UI cập nhật
  - Audio phát sound
  - Score tăng
  - Quest update

### 🔌 Plugin / Mod System

- Thêm logic mà không sửa code core

## 🚫 4. Khi nào KHÔNG nên dùng?

- ❌ Logic đơn giản, ít dependency
- ❌ Vòng lặp performance-critical:
  - Game loop
  - Physics update
  - Render loop
- ❌ Event bị spam quá nhiều
- ❌ Project nhỏ

## 🎮 5. Ứng dụng trong Game

### 🧩 UI cập nhật theo Game State

- HP thay đổi → thanh máu update
- Score thay đổi → UI refresh

### 📡 Event System

- Broadcast event:
  - `OnEnemyKilled`
  - `OnPlayerDamaged`
- Các system subscribe và xử lý riêng

### 🏆 Achievement System

- Ví dụ:
  - Kill 100 enemies → unlock achievement
- Observer theo dõi progress

### 🔊 Audio / VFX Trigger

- State change → phát sound / effect
- Tách logic khỏi gameplay chính

---

# 🧩 Observer Pattern

## 📌 1. Khái niệm

State Pattern là một mẫu thiết kế thuộc nhóm behavioral trong OOP. Nó cho phép một object thay đổi hành vi khi trạng thái nội tại thay đổi.

## 🧠 2. Cấu trúc cơ bản

### Thành phần:

- **State (interface / abstract class)**  
  Định nghĩa các hành vi (methods)

- **ConcreteState**  
  Cài đặt logic cho từng trạng thái

- **Context**
  - Giữ state hiện tại
  - Delegate hành vi cho state
  - Có thể chuyển state

## ⚙️ 3. Khi nào nên sử dụng?

### 🔁 Logic thay đổi theo state

- Hành vi khác nhau tùy trạng thái
- Tránh `if/switch` phức tạp

### 🧠 AI / Behavior phức tạp

- Enemy AI:
  - Patrol
  - Chase
  - Attack

### 🎮 Animation State Machine

- Idle → Run → Jump → Attack

### 🧱 Code dễ mở rộng

- Thêm state mới mà không sửa logic cũ

## 🚫 4. Khi nào KHÔNG nên dùng?

- ❌ Logic đơn giản (2–3 trạng thái)
- ❌ State không khác biệt rõ
- ❌ State thay đổi liên tục mỗi frame
- ❌ Phụ thuộc nhiều biến ngoài (state không độc lập)

## 🎮 5. Ứng dụng trong Game

### 🧍 Player / Enemy State

- Idle
- Move
- Attack
- Take Damage
- Dead

👉 Mỗi state có logic riêng, dễ quản lý

### 🎬 Animation System

- State machine điều khiển animation
- Transition rõ ràng giữa các state

### 🎮 Game State

- Main Menu
- Playing
- Pause
- Game Over

---

# 🧩 Singleton Pattern

## 📌 1. Khái niệm

Singleton Pattern là một mẫu thiết kế thuộc nhóm creational trong OOP. Nó đảm bảo rằng chỉ có duy nhất 1 thể hiện (instance) của một class tồn tại trong toàn bộ chương trình, và cung cấp điểm truy cập toàn cục (global access point) tới instance đó.

## 🧠 2. Cấu trúc cơ bản

### Thành phần:

- **Singleton**
  - Constructor private
  - Static instance
  - Static method `getInstance()`

## ⚙️ 3. Khi nào nên sử dụng?

### 🌐 Global Access

- Nhiều system cần truy cập chung

### ⚡ Performance

- Tránh truyền reference qua nhiều layer

### 🧱 Stateless / Low State

- Ít dữ liệu hoặc không phụ thuộc state

## 🚫 4. Khi nào KHÔNG nên dùng?

- ❌ Dùng cho mọi "manager"
- ❌ Có khả năng cần nhiều instance trong tương lai
- ❌ Gameplay object:
  - Player
  - Enemy
  - Bullet
- ❌ Làm tăng coupling giữa các hệ thống
- ❌ Khó test (global state)

## 🎮 5. Ứng dụng trong Game

### 🧭 Game Manager

- Quản lý state game:
  - Score
  - Level
  - Game flow

### 🔊 Audio Manager

- Quản lý sound/music toàn cục
- Play / Stop / Volume

### 🎮 Input Manager

- Xử lý input từ nhiều nguồn
- Keyboard / Controller
