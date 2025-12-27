import styles from "./spinner.module.css";

export const Spinner = ({ text }: { text?: string }) => {
  return (
    <div className={styles["spinner-box"]}>
      <svg width={32} height={32} viewBox="0 0 50 50" className="">
        <circle
          cx={25}
          cy={25}
          r={20}
          fill="none"
          stroke="currentColor"
          strokeWidth={6}
          strokeLinecap="round"
          strokeDasharray="90 150"
          strokeDashoffset={0}
          className={styles["rotating-circle"]}
          // style={{ rotate: "360deg" }}
        />
      </svg>
      <span>{text ?? "Loading..."}</span>
    </div>
  );
};
