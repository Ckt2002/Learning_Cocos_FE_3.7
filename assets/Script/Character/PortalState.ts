import { ICharacter } from "./ICharacter";
import { ICharacterState } from "./ICharacterState";
import { CAnimationName } from "../Constant/CAnimationName";
import { IdleState } from "./IdleState";

export class PortalState implements ICharacterState {
    onEnter(character: ICharacter) {
        character.characterAnimation.setAnimation(0, CAnimationName.PORTAL, false);
        character.characterAnimation.changeAnimation(0, CAnimationName.IDLE, 0, true);
        setTimeout(() => {
            character.changeState(new IdleState());
        }, 2000);
    }

    onUpdate(character: ICharacter, dt: number) { }

    onExit(character: ICharacter) { }
}