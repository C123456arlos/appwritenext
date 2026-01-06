import nodemailer from 'nodemailer'
import User from '../models/userModel'
import bcryptjs from 'bcryptjs'
export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)
        // await User.findByIdAndUpdate(userId, {
        //     verifyToken: hashedToken, verifyTokenExpiry: Date.now() +
        //         360000
        // }, { new: true, runValidators: true })
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 360000 })
        } else if (emailType === 'RESET') {
            await User.findByIdAndUpdate(userId, { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 360000 })
        }
        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "4b787c126d61d1",
                pass: "18574887ae575e"
            }
        })
        const mailOptions = {
            from: 'test@test.com',
            to: email,
            subject: emailType === "VERIFY" ? 'verify your email' : 'reset password',
            html: `<p>click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a>
            to ${emailType === "VERIFY" ? 'verify your email' : "reset your password"}</p> 
            or copy and paste the link <br>${process.env.DOMAIN}/verifyemail?token=${hashedToken}}`
        }
        const mailResponse = await transporter.sendMail(mailOptions)
        return mailResponse
    } catch (error: any) {
        throw new Error(error.message)
    }
}