import { CAnimationName } from "../Constant/CAnimationName";
import { ApplyDamage } from "./ApplyDamage";
import { ICharacter } from "./ICharacter";
import { ICharacterState } from "./ICharacterState";
import { RunningState } from "./RunState";

export class IdleState implements ICharacterState {
    onEnter(character: ICharacter) {
        character.characterAnimation.setAnimation(0, CAnimationName.IDLE, true);
    }

    onUpdate(character: ICharacter, _dt: number) {
        if (character.moveDirectionY !== 0) {
            character.changeState(new RunningState());
        }
    }

    onExit(character: ICharacter) { }

    onTakeDamage(character: ICharacter, value: number) {
        ApplyDamage(character, value);
    }
}