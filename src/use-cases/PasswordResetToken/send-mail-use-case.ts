import nodemailer from 'nodemailer'
import { env } from '@/env'

export class SendMailUseCase {
  private transporter: nodemailer.Transporter

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'mail.smtp2go.com', // Substitua pelo servidor correto, se necessário
      port: 2525, // SSL
      secure: false, // Certifique-se de que está definido como true para a porta 465
      auth: {
        user: 'fiappos', // Endereço de e-mail completo
        pass: 'K4ai7tAudbybSa5J', // Senha correta do e-mail
      },
    })
  }

  async handler(email: string, token: string) {
    const recoveryLink = `${env.HOST_FRONTEND}/redefinir-senha/${token}`
    const mailOptions = {
      from: 'fiap@thankapapers.com',
      to: email,
      subject: 'Solicitação de Recuperação de Senha', // Assunto
      text: 'Clique no botão abaixo para recuperar sua senha.', // Corpo do e-mail (texto simples)
      html: `<html>
              <body style="font-family: Arial, sans-serif; color: #333;">
                <h2 style="color: #0066cc;">Esqueceu sua senha? 😅</h2>
                <p>Não se preocupe, a gente te ajuda! Para recuperar sua senha, basta clicar no botão abaixo:</p>
                <p><a href="${recoveryLink}" style="background-color: #007bff;color: #fff;padding: 10px 20px;text-decoration: none; border-radius: 5px;">Recuperar Senha</a></p>
                <p>Este link expira em 1 hora.</p>
                <p>Se você não solicitou esta recuperação, por favor, ignore este email. 😉</p>
                <br>
                <footer style="font-size: 12px; color: #777;">
                  <p>Atenciosamente,</p>
                  <p>GRUPO 04</p>
                </footer>
              </body>
            </html>`,
    }

    try {
      await this.transporter.sendMail(mailOptions)
      return true
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error)
      throw new Error('Erro ao enviar e-mail')
    }
  }
}
