import { Either, left, right } from '@/shared'
import { MailServiceError } from '@/usecases/errors'
import { EmailOptions, EmailService } from '@/usecases/send-email/ports'
import * as nodemailer from 'nodemailer'
// import * as nodemailermock from 'nodemailer-mock'

export class NodemailerEmailService implements EmailService {
  async send (options: EmailOptions): Promise<Either<MailServiceError, EmailOptions>> {
    try {
      // const transporterMock = nodemailermock.createTransport()
      // transporterMock.sendMail(options)
      const transporter = nodemailer.createTransport({
        host: options.host,
        port: options.port,
        auth: {
          user: options.username,
          pass: options.password
        }
      })
      await transporter.sendMail({
        from: options.from,
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html,
        attachments: options.attachments
      })
    } catch (error) {
      console.log('Error!', error, options)
      return left(new MailServiceError())
    }
    console.log('Success!', options)
    return right(options)
  }
}
