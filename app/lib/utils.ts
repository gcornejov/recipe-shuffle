export function camelCase(unformated_string: string): string {
  return unformated_string
    .split(" ")
    .map(
      (word: string) =>
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
    )
    .join("");
}
