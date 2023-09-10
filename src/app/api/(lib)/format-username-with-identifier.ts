/**
 * Formats a username with a user identifier.
 * @param username The username to be formatted.
 * @param userNumber The user number to be formatted.
 * @param totalDigits The total digits of the user identifier.
 * @param paddingCharacter The padding character of the user identifier.
 * @returns The formatted username with the user identifier.
 * @example
 * formatUsernameWithIdentifier("username", 1, 4);
 * // "username#0001"
 * @example
 * formatUsernameWithIdentifier("username", 1, 4, "0");
 * // "username#0001"
 * @example
 * formatUsernameWithIdentifier("username", 1, 4, "x");
 * // "username#xxxx1"
 */

function formatUsernameWithIdentifier(
  username: string,
  userNumber: number,
  totalDigits: number,
  paddingCharacter?: string,
) {
  const userNumberString = String(userNumber);
  const paddingChar = paddingCharacter || "0";

  const paddingLength = totalDigits - userNumberString.length;
  if (paddingLength <= 0) {
    return userNumberString;
  }

  const padding = paddingChar.repeat(paddingLength);
  const formattedUserIdentifier = username + "#" + padding + userNumberString;
  return formattedUserIdentifier;
}

export default formatUsernameWithIdentifier;
