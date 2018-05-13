import nodemailer from 'nodemailer';

export class EmailSender {
    private transporter: any;
    private nodemailer: any;
    private mailOptions: any;
    private mailSent:boolean | undefined;
    private mailTestpreview : string | false;

    constructor(){
        this.mailTestpreview = '';
    }

    public getTransporter(){
        return this.transporter;
    }

    //devolver binder
    public createTransporter(paramHost: any, 
        paramPort: any, 
        paramSecure: any, 
        paramUser: any, 
        paramPass: any): nodemailer.Transporter{
           //As propriedades apenas aceitam Any :/
        const transporter = nodemailer.createTransport({
            host: paramHost,
            port: paramPort,
            secure: paramSecure,
            auth: {
            user: paramUser,
            pass: paramPass 
        }
        });
        return transporter;
    }

    public setMailOptions(paramFrom: String, 
        paramTo: String,
        paramSubject: String,
        paramContent: String){
        
        this.mailOptions = {
            from: paramFrom,
            to: paramTo,
            subject: paramSubject,
            text: paramContent
        };

    }

    public async sendMailOrder(inputTransporter: nodemailer.Transporter,
                        mailOptions: object): Promise<nodemailer.SentMessageInfo|Error|null>{
        console.log("sendMailOrder " + inputTransporter);
        console.log("mailOptions " + mailOptions);
        return inputTransporter.sendMail(mailOptions);
    }

    public createTestConnection():Boolean{
        nodemailer.createTestAccount((err, account) => {
            if(err){
                return false;
            }
            if(account){
                this.createTransporter(account.smtp.host,
                    account.smtp.port,
                    account.smtp.secure,
                    account.user,
                    account.pass);
                return true;
            }
        });
        
        return false;
    }

    public async getTestAccount(): Promise<nodemailer.TestAccount|null> {
        return nodemailer.createTestAccount();
        

    }

    public getPreviewTest() : string | false{
        return this.mailTestpreview;
    }


}