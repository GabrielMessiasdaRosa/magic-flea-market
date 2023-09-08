export const matchMinimumCharacter = (value: string) => {
  const minCaractersRequired = /(?=.{8,})/;
  if (!value) {
    return false;
  } else if (!value.match(minCaractersRequired)) {
    return false;
  } else {
    return true;
  }
};

export const matchUppercaseLetter = (value: any) => {
  const uppercaseRequired = /(?=.*[A-Z])/;
  if (!value) {
    return false;
  } else if (!value.match(uppercaseRequired)) {
    return false;
  } else {
    return true;
  }
};

export const matchLowercaseLetter = (value: string) => {
  const lowercaseRequired = /(?=.*[a-z])/;
  if (!value) {
    return false;
  } else if (!value.match(lowercaseRequired)) {
    return false;
  } else {
    return true;
  }
};

export const matchNumberRequired = (value: string) => {
  const numberRequired = /(?=.*[0-9])/;
  if (!value) {
    return false;
  } else if (!value.match(numberRequired)) {
    return false;
  } else {
    return true;
  }
};

export const matchSpecialRequired = (value: string) => {
  const specialRequired = /(?=.*[!@#$%^&*])/;
  if (!value) {
    return false;
  } else if (!value.match(specialRequired)) {
    return false;
  } else {
    return true;
  }
};

export const validPassword = (value: string) => {
  if (!value) {
    return false;
  } else if (
    matchMinimumCharacter(value) &&
    matchUppercaseLetter(value) &&
    matchLowercaseLetter(value) &&
    matchNumberRequired(value) &&
    matchSpecialRequired(value)
  ) {
    return true;
  } else {
    return false;
  }
};
