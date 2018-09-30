export default function load(fileName) {
  console.log('###mock### - fileName', fileName);
  const mockData = require(`./resp/${fileName}`).default;
  console.log('###mock### - data', mockData);
  return mockData;
}
