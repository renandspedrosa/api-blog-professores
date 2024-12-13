import nodemailer from 'nodemailer'

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
    const mailOptions = {
      from: 'fiap@thankapapers.com',
      to: email,
      subject: 'teste envio', // Assunto
      text: 'email teste!', // Corpo do e-mail (texto simples)
      html: `<b>envio teste com Node.js!</b> ${token}`, // Corpo do e-mail (HTML)
    }

    // Certifique-se de usar this.transporter corretamente
    try {
      await this.transporter.sendMail(mailOptions)
      return true
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error)
      throw new Error('Erro ao enviar e-mail')
    }
  }
}
