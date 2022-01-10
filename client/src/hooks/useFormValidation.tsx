import { useCallback, useEffect, useState } from "react";

export interface InputValidationType {
  false: boolean | undefined;
  message: string | undefined;
}

interface options {
  isEmpty?: boolean;
  match?: string | null;
  isEmail?: boolean;
  securePass?: boolean;
}

export const useInputValidation = (
  initialize: string | null = null,
  options: options = { isEmpty: true }
): [string | null, Function, InputValidationType] => {
  const [value, setValue] = useState<string | null>(initialize);
  const [validation, setValidaton] = useState<InputValidationType>({
    false: undefined,
    message: undefined,
  });

  const resetValidation = () => {
    setValidaton({ false: false, message: undefined });
  };

  const isEmptyOrWhiteSpace = (input: string | null) => {
    if (input) {
      return /\S/.test(input);
    }
  };

  const isMatch = useCallback(
    (input: string | null) => {
      if (input) {
        return input === options?.match;
      }
    },
    [options?.match]
  );

  const isEmail = (input: string | null) => {
    if (input) {
      return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(input);
    }
  };

  const securePassword = (input: string | null) => {
    if (input) {
      return /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{12,}$/.test(
        input
      );
    }
  };

  useEffect(() => {
    // Check if input is empty or white space
    if (typeof value === "string") {
      if (options?.isEmpty) {
        if (!isEmptyOrWhiteSpace(value)) {
          return setValidaton({
            false: true,
            message: "Input is empty or whitespace",
          });
        } else {
          resetValidation();
        }
      }

      // Check if input match provided value
      if (options?.match) {
        if (!isMatch(value)) {
          return setValidaton({
            false: true,
            message: "Not match",
          });
        } else {
          resetValidation();
        }
      }

      // Check if input is email
      if (options?.isEmail) {
        if (!isEmail(value)) {
          return setValidaton({
            false: true,
            message: "Must be an email",
          });
        } else {
          resetValidation();
        }
      }

      if (options?.securePass) {
        if (!securePassword(value)) {
          return setValidaton({
            false: true,
            message: "Password not secure enough",
          });
        } else {
          resetValidation();
        }
      }
    }
  }, [
    value,
    isMatch,
    options?.match,
    options?.isEmpty,
    options?.isEmail,
    options?.securePass,
  ]);

  return [value, setValue, validation];
};
