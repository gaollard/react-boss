export function getChatId (from, to) {
  return [from, to].sort().join('_');
}