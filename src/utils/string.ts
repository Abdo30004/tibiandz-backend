export function formatString(str: string, args: Record<string, string>): string {
  return str.replace(/{{(\w+)}}/g, (match, key) => {
    return args[key] || match;
  });
}
