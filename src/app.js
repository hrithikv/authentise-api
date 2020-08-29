import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import apicache from 'apicache';
import rateLimit from 'express-rate-limit';

import { errorLogger, validateToken } from './middleware';
import musicians from './musicians';
import schema from './schema';

const app = express();

// MIDDLEWARE
app.use(morgan('dev'));

app.use(helmet());

app.use(express.json());

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

const cache = apicache.middleware;        

const router = express.Router();

router.get('/', cache('30 minutes'), (req, res) => {
  req.apicacheGroup = 'all';
  res.json(musicians);
});

router.get('/:id', cache('30 minutes'), (req, res, next) => {
  try {
    const ID = req.params.id;
    req.apicacheGroup = ID;

    if (musicians[ID]) {
      res.status(200).send(musicians[ID]);
    } else {
      res.status(400).send({
        errorMessage: 'Musician does not exist',
      });
    }
  } catch (e) {
    next(new Error('Bad GET Request'));
  }
});

router.put('/:id', validateToken, (req, res, next) => {
  try {
    const ID = req.params.id;

    if (musicians[ID]) {
      const update = schema.validateSync({
        ...musicians[ID],
        ...req.body,
      });

      musicians[ID] = update;
    } else {
      musicians[ID] = schema.validateSync(req.body);
    }

    // Clear all cache
    apicache.clear(ID);
    apicache.clear('all');

    res.send({
      id: ID,
    });
  } catch (e) {
    next(new Error(`Bad PUT request: ${e.message}`));
  }
});

router.use(errorLogger);

app.use('/musicians', apiLimiter, router);

export default app;
