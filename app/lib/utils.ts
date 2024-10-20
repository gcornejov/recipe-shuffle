const fractionMap: Record<string, number> = {
  "3/4": 0.75,
  "1/2": 0.5,
  "1/4": 0.25,
};

export function pascalCase(unformated_string: string): string {
  return unformated_string
    .split(" ")
    .map(
      (word: string) =>
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
    )
    .join("");
}

export function formatFractions(decimalValue: number): string {
  const integerPart = Math.trunc(decimalValue);
  const decimalPart = decimalValue - integerPart
  
  let fractionValue: string = "";
  if (decimalPart) {
    for (const [fraction, decimal] of Object.entries(fractionMap)) {
      fractionValue = fraction
      if (decimalPart >= decimal) {
        break;
      }
    }
  }

  const fraction = `${integerPart || ""} ${fractionValue}`.trim()
  return fraction;
}
