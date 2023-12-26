export function validateEmail(email: string): boolean {
  const validEmailFormat = /\S+@\S+\.\S+/;
  return validEmailFormat.test(email);
}
