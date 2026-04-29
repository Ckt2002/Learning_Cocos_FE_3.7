import { CAnimationName } from "../Constant/CAnimationName";
import { ICharacter } from "./ICharacter";
import { ICharacterState } from "./ICharacterState";

export class DeadState implements ICharacterState {
    onEnter(character: ICharacter) {
        character.characterAnimation.setAnimation(0, CAnimationName.DEATH, false);
        character.onDead();
    }

    onUpdate(character: ICharacter, dt: number) { }

    onExit(character: ICharacter) { }
}