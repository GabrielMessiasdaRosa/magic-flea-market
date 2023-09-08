import {
  matchLowercaseLetter,
  matchMinimumCharacter,
  matchNumberRequired,
  matchSpecialRequired,
  matchUppercaseLetter,
} from "@/lib/validate-password";
export type PasswordCheckerProps = {
  password: string;
};

const PasswordChecker = ({ password }: PasswordCheckerProps) => {
  return (
    <div className="flex flex-col space-y-1">
      <span>A senha deve conter:</span>
      <ValidationListItem
        label="No mínimo 8 caracteres"
        variant={matchMinimumCharacter(password) ? "success" : "danger"}
      />
      <ValidationListItem
        label="No mínimo uma letra maiúscula"
        variant={matchUppercaseLetter(password) ? "success" : "danger"}
      />
      <ValidationListItem
        label=" No mínimo uma letra minúscula"
        variant={matchLowercaseLetter(password) ? "success" : "danger"}
      />
      <ValidationListItem
        label="No mínimo um número"
        variant={matchNumberRequired(password) ? "success" : "danger"}
      />
      <ValidationListItem
        label="No mínimo um caractere especial"
        variant={matchSpecialRequired(password) ? "success" : "danger"}
      />
    </div>
  );
};
export default PasswordChecker;

function ValidationListItem({
  variant,
  label,
}: {
  variant: "success" | "danger";
  label: string;
}) {
  return (
    <div className="flex text-sm md:text-base items-center ">
      {variant === "success" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4 md:w-6 md:h-6 text-green-500 "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4 md:w-6 md:h-6 text-rose-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      )}
      <span
        className={`ml-1 ${variant === "success" ? "success-500" : "gray-400"}`}
      >
        {label}
      </span>
    </div>
  );
}
