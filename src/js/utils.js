export function randomIntRange(min, max) {
  const minimum = Math.ceil(min);
  const maximum = Math.floor(max);
  return ~~(Math.random() * (maximum - minimum)) + minimum;
}
