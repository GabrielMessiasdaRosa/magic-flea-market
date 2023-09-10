import { generateUniqueToken } from "@/lib/generate-unique-token";
import prisma from "@/lib/prisma";
import addRecoveryAttempt from "./add-recovery-attempt";
import { sendMail } from "./mail-service";

async function createNewRecoveryRequest(email: string) {
  await addRecoveryAttempt(email);
  const uniqueToken = generateUniqueToken();
  const expirationDate = new Date(Date.now() + 5 * 60 * 1000); // Prazo de validade de 5 minutos
  await sendMail(email, uniqueToken);

  await prisma.recoveryRequest.create({
    data: {
      email: email,
      token: uniqueToken,
      expirationDate: expirationDate,
    },
  });
}
export default createNewRecoveryRequest;
