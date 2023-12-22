// We can ignore the linting errors as this is meant to take a generic array
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getRandomElements = (array: any[], number: number): any[] => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: any[] = new Array(number);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const taken: any[] = new Array(number);
  let length: number = array.length;

  for (let i = 0; i < number; i++) {
      const x: number = Math.floor(Math.random() * length);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
      result[i] = array[x in taken ? taken[x] : x];
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      taken[x] = --length in taken ? taken[length] : length;
  }

  return result;
};

// We can ignore the linting errors as this is meant to take a generic array
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const randomize = (array: any[]): any[] => {
  const randomize = (): number => { return Math.random() > 0.5 ? 1 : -1; };

  return Array.prototype.sort.call(array, randomize);
};

export {
  getRandomElements,
  randomize,
};