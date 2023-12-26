export async function postNewPasswordRecovery(values: any) {
  try {
    const res = await fetch("/api/users/forgot-password/set-new", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
}
