import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
import { client, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
    const recipients = [{ email }]

    try {
        const response = await client.send({
            from: sender,
            to: recipients,
            subject: "Verify you Email!",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification",
        })
            .then(console.log, console.error);
        console.log("Email Sent Successfully", response);
    } catch (error) {
        console.error(`Error sending  verification email:`, error);
        throw new Error(`Error sending verification email: ${error}`)
    }
}

export const sendWelcomeEmail = async (email, name) => {
    const recipients = [{ email }];

    try {
        const response = await client.send({
            from: sender,
            to: recipients,
            template_uuid: "c10bfe6e-9a05-47da-aba6-971ad591ff7c",
            template_variables: {
                name: name,
                company_info_name: "GPS Toll System",
                company_info_address: "Sakec",
                company_info_city: "Mumbai",
                company_info_zip_code: "400058",
                company_info_country: "India"
            }
        });
        console.log("Welcome Email Sent Successfully", response);
    } catch (error) {
        console.error(`Error sending welcome email:`, error);
        throw new Error(`Error sending welcome email: ${error.message}`);
    }
};
