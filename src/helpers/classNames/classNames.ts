type Mods = Record<string, boolean | string>;

// export function classNames(
//   cls: string,
//   mods: Mods,
//   additional: string[]
// ): string {
//   return [
//     cls,
//     ...additional,
//     ...Object.entries(mods)
//       .filter(([className, value]) => Boolean(value))
//       .map(([className, value]) => className),
//   ].join(" ");
// }

// попробовал оптимизировать память и циклы
export function classNames(
  cls: string,
  mods: Mods,
  additional: string[]
): string {
  const classNamesArray: string[] = [cls];

  for (const [className, value] of Object.entries(mods)) {
    if (value) {
      classNamesArray.push(className);
    }
  }

  if (additional.length > 0) {
    classNamesArray.push(...additional);
  }

  return classNamesArray.join(" ");
}
