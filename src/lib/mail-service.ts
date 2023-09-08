import nodemailer from "nodemailer";

export async function sendMail(
  destination: string,
  token: string
): Promise<boolean> {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PW,
    },
  });

  const resetPasswordLink = `${process.env.NEXT_PUBLIC_BASE_URL}/recovery/set-new-password?email=${destination}&token=${token}`;

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Recuperação de Senha - Magic Flea Market</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f2f2f2;
                margin: 0;
                padding: 0;
            }

            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #fff;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                border-radius: 5px;
                text-align: center;
            }

            a {
              color: #fff !important;
              text-decoration: none !important;
            }

            h1 {
                color: #3f51b5;
            }

            p {
                color: #333;
            }

            .button {
                display: inline-block;
                background-color: #3f51b5;
                color: #fff;
                padding: 10px 20px;
                margin-top: 20px;
                text-decoration: none;
                border-radius: 5px;
            }

            .button:hover {
                background-color: #303f9f;
            }

            footer {
                margin-top: 20px;
                color: #777;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Recuperação de Senha - Magic Flea Market</h1>
            <p>Olá,</p>
            <p>Recebemos uma solicitação de recuperação de senha para a sua conta no Magic Flea Market. Clique no botão abaixo para redefinir a sua senha:</p>
            <a href="${resetPasswordLink}" class="button">Redefinir Senha</a>
            <p>Você tem 5 minutos para redefinir a sua senha. Após esse período, será necessário solicitar uma nova recuperação de senha.</p>
            <footer>
                <p>Se você não solicitou a recuperação de senha, ignore este e-mail. Ele é enviado automaticamente.</p>
                <p>Magic Flea Market &copy; 2023</p>
            </footer>
        </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: destination,
    subject: "Recuperação de Senha - Magic Flea Market",
    html: html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email Sent");
    return true;
  } catch (error: any) {
    throw new Error(error);
  }
}
