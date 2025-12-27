import { Fragment, type ReactNode } from "react";

type SortDir = "asc" | "desc";
type SortRule<T> = {
  key: keyof T;
  dir: SortDir;
};

type EachProps<T> = {
  of: T[];
  itemKey?: keyof T | ((item: T) => string | number);
  children: (item: T) => ReactNode;
  sort?: (
    by: SortBuilder<T extends Record<keyof T, any> ? T : {}>
  ) => SortBuilder<T extends Record<keyof T, any> ? T : {}>;
  filter?: (item: T) => boolean;
};

class SortBuilder<T extends Record<string, any>> {
  rules: SortRule<T>[] = [];

  asc(key?: keyof T) {
    this.rules.push({ key: key as keyof T, dir: "asc" });
    return this;
  }
  desc(key?: keyof T) {
    this.rules.push({ key: key as keyof T, dir: "desc" });
    return this;
  }
}

function createComparator<T>(rules: SortRule<T>[]): (a: T, b: T) => number {
  return (a, b) => {
    for (const rule of rules) {
      let av = typeof a === "object" && a !== null ? a[rule.key] : a;
      let bv = typeof b === "object" && b !== null ? b[rule.key] : b;

      if (typeof av === "string" && typeof bv === "string") {
        av = av.toLowerCase() as T;
        bv = bv.toLowerCase() as T;
      }

      if (av === bv) continue;
      const result = av > bv ? 1 : av < bv ? -1 : 0;
      return rule.dir === "asc" ? result : -result;
    }
    return 0;
  };
}

export const Each = <T,>({
  of,
  itemKey,
  children,
  sort,
  filter,
}: EachProps<T>) => {
  let items = of;
  const getKey = (item: T, index: number): string | number => {
    if (!itemKey) return index;
    if (typeof itemKey === "function") return itemKey(item);
    return item[itemKey] as string | number;
  };

  if (sort) {
    const builder = new SortBuilder<T extends Record<keyof T, any> ? T : {}>();
    sort(builder);
    const comparator = createComparator(builder.rules) as (
      a: T,
      b: T
    ) => number;
    items = [...of].sort(comparator);
  }
  return (
    <>
      {(!filter ? items : items.filter((item) => filter(item))).map(
        (item, index) => (
          <Fragment key={getKey(item, index)}>{children(item)}</Fragment>
        )
      )}
    </>
  );
};
