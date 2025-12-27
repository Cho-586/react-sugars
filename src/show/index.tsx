import React from "react";
import { Then } from "./then.js";
import { Else } from "./else.js";

type ShowInlineProps = {
  then: React.ReactNode;
  else?: React.ReactNode;
  children?: never;
};

type ShowNestedProps = {
  then?: never;
  else?: never;
  children: React.ReactNode;
};

type ShowProps = {
  if: boolean;
} & (ShowInlineProps | ShowNestedProps);

export const Show = ({ if: condition, ...props }: ShowProps) => {
  // Inline mode
  if ("then" in props && props.then !== undefined) {
    if (condition) return props.then;
    return props.else;
  }
  // Nested Mode
  else {
    if (props.children) {
      const childArray = React.Children.toArray(props.children);
      const resolved = childArray.find((c: any) => {
        if (condition) return c.type?.$$type === "show.then";
        // <Else if={condition}>
        const resolvedElseIf = c.type?.$$type === "show.else" && c.props?.if;
        if (resolvedElseIf) return resolvedElseIf;
        // <Else>
        const fallback =
          c.type?.$$type === "show.else" && c.props?.if === undefined;
        return fallback ? fallback : null;
      });
      return resolved;
    }
  }
};

Show.Then = Then;
Show.Else = Else;
