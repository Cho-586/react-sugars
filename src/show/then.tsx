type ThenProps = {
  children: React.ReactNode;
};

export const Then = ({ children }: ThenProps) => {
  return <>{children}</>;
};

Then.$$type = "show.then";
