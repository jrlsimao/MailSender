import {EmailSender} from './mailer';
import {Request, Response} from 'express';
import {TestAccount, SentMessageInfo, getTestMessageUrl} from 'nodemailer';

export class MailControlador {

    private requestContent: any;
 
    constructor(){
    }  

    public async sendMail(req:Request, resp: Response){

        //instanciar
        const mailInstancia = new EmailSender();
        try{
            const dataTestAccount = await mailInstancia.getTestAccount();
            console.log(dataTestAccount);
            if(dataTestAccount){
                const transporterTest = mailInstancia.createTransporter(dataTestAccount.smtp.host,
                    dataTestAccount.smtp.port,
                    dataTestAccount.smtp.secure,
                    dataTestAccount.user,
                    dataTestAccount.pass);
                
                
                try{
                    const enviou = await mailInstancia.sendMailOrder(transporterTest, req.body);
                    if(enviou){
                        //Se for teste
                        resp.status(200).send('Sucesso');
                        console.log('mail sent ' + getTestMessageUrl(enviou));
                        console.log('Enviou');
                    }
                    else{
                        resp.status(500).send('Falhou o envio');
                        console.log('Falhou');

                    }
                }
                catch(Error){
                    console.log('Falha da funcao de Envio ' + Error);
                }
                
            }
            else{
                console.log("Nao funcionou");
            }
        }
        catch(error){
            console.log(error);
        }
        
    }

    public createMailOptions(objecto: any) : any{
        console.log('o objecto está ' + objecto);

        return {
            from: objecto.From,
            to: objecto.To,
            subject: objecto.Subject,
            text: objecto.Content,
            html: '<p>' + objecto.Content + '</p>'
        };
    }

}