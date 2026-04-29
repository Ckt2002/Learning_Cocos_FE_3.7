import { DeadState } from "./DeadState";
import { ICharacter } from "./ICharacter";

export function ApplyDamage(character: ICharacter, value: number) {
    const alive = character.characterController.takeDamage(value);
    if (!alive) {
        character.changeState(new DeadState());
    }
}