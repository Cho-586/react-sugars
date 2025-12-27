type ElseProps = {
  if?: boolean;
  children: React.ReactNode;
};

export const Else = ({ children }: ElseProps) => {
  return <>{children}</>;
};

Else.$$type = "show.else";
