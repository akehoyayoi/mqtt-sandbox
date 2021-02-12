import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { MQTTService } from '../services/MQTTService';
const app = express();
app.use(helmet());
app.use(cors());

const router = express.Router();

// implement calling service
router.get('/test', (req, res, next) => {
    const service = MQTTService.getInstance();
    service
      .publish('topic0','test')
      .then(result => res.status(200).send(result))
      .catch(next);
});

// NOT FOUND cases
app.use((req, res) => {
    res.status(404);
    res.render('error', {
      param: {
        status: 404,
        message: 'not found'
      },
    });
});

module.exports = router;
