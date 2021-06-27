export function removeLeadingSlash(location) {
  return location.substring(1);
}

export function createArray(length) {
  return Array.from(Array(length), (x, index) => index + 1);
}

export function fetchData(path) {
  const url = `/data/${path}.json`;
  return fetch(url).then((response) => response.json());
}

export function convertToSelectObject(array) {
  array = typeof array === 'number' ? createArray(array) : array;
  return array.map((value, index) => {
    return { value: index, text: value };
  });
}
