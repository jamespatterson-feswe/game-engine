import { Position } from '../../position';

export const keyCodes = ['KeyA', 'KeyW', 'KeyD', 'KeyS'];

export const keyCodeMap: Map<string, Position> = new Map();

keyCodeMap.set(keyCodes[0], new Position(-1, 0));
keyCodeMap.set(keyCodes[1], new Position(0, 1));
keyCodeMap.set(keyCodes[2], new Position(1, 0));
keyCodeMap.set(keyCodes[3], new Position(0, -1));
