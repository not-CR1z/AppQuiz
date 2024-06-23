import { AlphabetPipe } from './helpers/alphabet.pipe';

describe('AlphabetPipe', () => {
  it('create an instance', () => {
    const pipe = new AlphabetPipe();
    expect(pipe).toBeTruthy();
  });
});
