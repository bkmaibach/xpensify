const add = (a, b) => a + b;
const generateGreeting = (name) => { return `Hello there, ${name}!`};

test('Should add two numbers', () => {
  const result = add(4, 5);
  expect(result).toBe(9);

});

test('Should greet Mike', () => {
  const result = generateGreeting("Mike");
  expect(result).toBe(`Hello there, Mike!`);

});