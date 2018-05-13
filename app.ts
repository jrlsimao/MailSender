import Express from 'express';
import * as bodyParser from 'body-parser';
import {MailControlador} from './controllers/mail-controlador'
const servidor = Express();

servidor.use(bodyParser.json());

const mailControler = new MailControlador();
servidor.post('/sendMail', mailControler.sendMail);

servidor.listen(3001, () => {
    console.log('Ligou');
});
