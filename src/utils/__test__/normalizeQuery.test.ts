import pretty from '../normalizeQuery';

describe('normalizeQuery', () => {
  it('prettifies a simple GraphQL query', () => {
    const inputQuery =
      '{characters(page:2,filter:{name:"rick"}){info{count}results{name}}}';
    const expectedOutput = `
{
  characters(page: 2, filter: {name: "rick"}) {
    info {
      count
    }
    results {
      name
    }
  }
}
`.trim();
    const result = pretty(inputQuery).trim();
    expect(result).toEqual(expectedOutput);
  });
});
