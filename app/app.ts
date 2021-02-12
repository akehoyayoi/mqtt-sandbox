// load ligrary
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { MQTTService } from './services/MQTTService';
const app = express();
app.use(helmet());
app.use(cors());
const bodyParser = require('body-parser');

//body-parserの設定
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 3000; 

const router = require('./routes/');
app.use('/', router);

// launch server
app.listen(port);
console.log('listen on port ' + port);

// initialize callback function
const service = MQTTService.getInstance();
service.addCallback('key', (topic, message) => {
    console.log('subscriber.on.message', 'topic:', topic, 'message:', message);
});
