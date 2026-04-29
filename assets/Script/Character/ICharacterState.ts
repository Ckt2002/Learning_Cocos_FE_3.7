import { ICharacter } from "./ICharacter";

export interface ICharacterState {
    onEnter(character: ICharacter): void;
    onUpdate(character: ICharacter, dt: number): void;
    onExit(character: ICharacter): void;
    onTakeDamage?(character: ICharacter, value: number): void;
}