export function getEnumeratorKeys(enumerator: object) {
  enumerator = enumerator || {};

  return Object.keys(enumerator)
    .filter(k => typeof enumerator[k as any] === 'number');
}
