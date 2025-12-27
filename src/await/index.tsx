import { useEffect, useState } from "react";
import { Spinner } from "./spinner.js";

type AwaitProps<T> = {
  promise: () => Promise<T>;
  pending?: React.ReactNode | string | false;
  error?: (error: Error) => React.ReactNode;
  children: (r: T) => React.ReactNode;
  parseJson?: boolean;
};

type PromiseState = "resolved" | "pending" | "error";

export const Await = <T,>({
  promise,
  pending,
  error,
  parseJson,
  children,
}: AwaitProps<T>) => {
  const [state, setState] = useState<PromiseState>("pending");
  const [resolved, setResolved] = useState<T | null>(null);
  const [errorUI, setErrorUI] = useState<Error | null>(null);

  // render pending UI
  const renderPendingUI = () => {
    if (pending === false) return null;
    if (typeof pending === "string") {
      return <Spinner text={pending} />;
    }
    if (pending) return pending;
    return <Spinner />;
  };

  // Get the resolved data
  useEffect(() => {
    const resolvePromise = async () => {
      try {
        const res = (await promise()) as Response;
        if (!res.ok) {
          throw new Error(res.statusText || `Request failed ${res.status}`);
        }
        const data = !parseJson ? res : await res.json();
        setResolved(data);
        setState("resolved");
      } catch (err) {
        setErrorUI(err instanceof Error ? err : new Error("unknown error"));
        setState("error");
      }
    };
    resolvePromise();
  }, []);

  return (
    <>
      {state === "pending" && renderPendingUI()}
      {state === "resolved" && children(resolved!)}
      {state === "error" && error && error(errorUI!)}
    </>
  );
};
