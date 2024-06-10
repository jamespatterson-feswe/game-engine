/**
 * @description This is a way to ensure the hero cannot walk into a wall, water, mountain, etc
 * @todo Research a way better way than manually setting this up
 */
export const walls = new Set();

[
  '64,48',
  '64,64',
  '64,80',
  '80,64',
  '80,80',
  '112,80',
  '128,80',
  '144,80',
  '160,80',
  '128,48',
  '144,48',
  '192,96',
  '208,96',
  '224,96',
  '224,64',
  '208,64',
  '224,32'
].forEach((coordinate: string) => walls.add(coordinate));

// export const level
// x: 32, y: 112
