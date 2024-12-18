import { formatFractions, pascalCase } from "@/app/lib/utils";

test('formats "some phrase" to "SomePhrase"', () => {
    expect(pascalCase("some phrase")).toBe("SomePhrase");
});

test("formats decimal to fraction", () => {
    expect(formatFractions(0.25)).toBe("1/4");
    expect(formatFractions(0.5)).toBe("1/2");
    expect(formatFractions(0.75)).toBe("3/4");
    expect(formatFractions(2.25)).toBe("2 1/4");
    expect(formatFractions(0.6)).toBe("1/2");
});
