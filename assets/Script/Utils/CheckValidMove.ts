import { Vec2 } from "cc";

export function checkValidMove(y: number, limit: Vec2, dir: number): boolean {
    return (dir > 0 && y < limit.y) || (dir < 0 && y > limit.x);
}