export function numbersOnly(e) {
  if (isNaN(Number(e.key))) e.preventDefault();
}
