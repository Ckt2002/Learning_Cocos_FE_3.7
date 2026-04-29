import { CharacterAnimation } from "./CharacterAnimation";
import { CharacterController } from "./CharacterController";
import { ICharacterState } from "./ICharacterState";

export interface ICharacter {
    characterController: CharacterController;
    characterAnimation: CharacterAnimation;
    moveDirectionY: number;

    changeState(state: ICharacterState): void;
    onDead(): void;
}