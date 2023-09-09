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
    <div className="flex items-center text-sm md:text-base ">
      {variant === "success" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-4 w-4 text-green-500 md:h-6 md:w-6"
        >
          <path
            fillRule="evenodd"
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-4 w-4 text-rose-600 md:h-6 md:w-6"
        >
          <path
            fillRule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
            clipRule="evenodd"
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
