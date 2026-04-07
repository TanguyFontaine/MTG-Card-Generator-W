export function console_assert(condition: boolean, message: string): void
{
   return console.assert(condition, message);
}

export const VALID_IMAGE_EXTENSIONS = ["png", "jpeg", "jpg", "gif", "webp"];

export function isValidImageExtension(fileName: string): boolean
{
   const extension = fileName.split(".").pop()?.toLowerCase() ?? "";
   return VALID_IMAGE_EXTENSIONS.includes(extension);
}

export function formatSymbol(symbol: string | number): string
{
   return `[${symbol}]`;
}

export function removeBrackets(bracketedString: string): string
{
   return bracketedString.slice(1, -1);
}
