import type { Dispatch, SetStateAction } from "react";

type ErrorPropsType = {
  children: string;
  setError: Dispatch<SetStateAction<string>>;
};

// Displays a styled error message with a close button.

function ErrorAlert({ children, setError }: ErrorPropsType) {
  return (
    <div
      className="w-full max-w-md bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex justify-between items-center"
      role="alert"
    >
      <span className="text-sm sm:text-base">{children}</span>
      <button
        onClick={() => setError("")}
        className="ml-4 text-red-700 hover:text-red-900"
      >
        <svg
          className="fill-current h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <title>Close</title>
          <path d="M14.348 5.652a1 1 0 0 0-1.414-1.414L10 7.172 7.066 4.238a1 1 0 0 0-1.414 1.414L8.586 8.586l-2.934 2.934a1 1 0 1 0 1.414 1.414L10 10.828l2.934 2.934a1 1 0 0 0 1.414-1.414L11.414 8.586l2.934-2.934z" />
        </svg>
      </button>
    </div>
  );
}

export default ErrorAlert;
