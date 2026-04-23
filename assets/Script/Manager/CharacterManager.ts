import { _decorator, Component, Node } from 'cc';
import { CharacterController } from '../Character/CharacterController';
const { ccclass, property } = _decorator;

@ccclass('CharacterManager')
export class CharacterManager extends Component {

    currentCharacter: CharacterController;
}