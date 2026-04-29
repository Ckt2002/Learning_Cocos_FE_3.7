import { CAnimationName } from "../Constant/CAnimationName";
import { checkValidMove } from "../Utils/CheckValidMove";
import { ApplyDamage } from "./ApplyDamage";
import { ICharacter } from "./ICharacter";
import { ICharacterState } from "./ICharacterState";
import { IdleState } from "./IdleState";

export class RunningState implements ICharacterState {
    onEnter(character: ICharacter) {
        character.characterAnimation.setAnimation(0, CAnimationName.RUN, true);
    }

    onUpdate(character: ICharacter, dt: number) {
        if (character.moveDirectionY === 0) {
            character.changeState(new IdleState());
            return;
        }
        const { characterController } = character;
        const pos = characterController.node.position;
        if (!checkValidMove(pos.y, characterController.limitVertical, character.moveDirectionY)) {
            character.changeState(new IdleState());
            return;
        }
        characterController.node.setPosition(
            pos.x,
            pos.y + dt * characterController.moveSpeed * character.moveDirectionY
        );
    }

    onExit(character: ICharacter) { }

    onTakeDamage(character: ICharacter, value: number) {
        ApplyDamage(character, value);
    }
}