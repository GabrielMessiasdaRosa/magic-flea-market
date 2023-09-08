export interface LoadingIconProps {
  className?: string;
}

export default function LoadingIcon({
  className = "w-7 h-7",
}: LoadingIconProps) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="100"
      height="100"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      fill="none"
      stroke="currentColor"
      stroke-width="4"
    >
      <circle
        cx="50"
        cy="50"
        r="30"
        stroke-dasharray="141.37166941154067 49.12388980384689"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          repeatCount="indefinite"
          dur="1s"
          values="0 50 50;360 50 50"
          keyTimes="0;1"
        ></animateTransform>
      </circle>
    </svg>
  );
}
