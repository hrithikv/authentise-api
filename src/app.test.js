import supertest from 'supertest';
import musicians from './musicians';

import app from './app';

const muddy = {
  firstName: 'Muddy',
  lastName: 'Waters',
  genre: 'ROCK',
};

const joel = {
  firstName: 'Billy',
  lastName: 'Joel',
  genre: 'ROCK',
};

const request = supertest(app);

it('GET ALL - Should respond 200 with all musicians', done => {
  request
    .get('/musicians')
    .expect('Content-Type', /json/)
    .expect(200, musicians, done);
});

it('GET BY ID - Should respond 200 musician by ID', done => {
  request
    .get('/musicians/ella')
    .expect('Content-Type', /json/)
    .expect(200, musicians.ella, done);
});

it('GET BY ID - Should respond 400 if musician does not exist', done => {
  request
    .get('/musicians/joel')
    .expect('Content-Type', /json/)
    .expect(400, done);
});

it('CREATE BY ID - Should respond 200 if musician does not exist and create it', done => {
  request
    .put('/musicians/joel')
    .send(joel)
    .expect('Content-Type', /json/)
    .expect(200, { id: 'joel' }, done);
});

it('CREATE BY ID - Should respond 400 if bad request data', done => {
  request
    .put('/musicians/example')
    .send({
      firstName:
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
      lastName:
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
      genre: 'ROCK',
    })
    .expect('Content-Type', /json/)
    .expect(
      400,
      {
        errorMessage:
          'Bad PUT request: firstName must be less than 50 characters',
      },
      done
    );
});

it('PUT BY ID - Should respond 200 if musician does exist and update it', done => {
  request
    .put('/musicians/waters')
    .send(muddy)
    .expect('Content-Type', /json/)
    .expect(200, { id: 'waters' }, done);
});

it('PUT BY ID - Should respond 400 if bad update', done => {
  request
    .put('/musicians/waters')
    .send({ genre: 'COUNTRY' })
    .expect('Content-Type', /json/)
    .expect(400, done);
});

it('GET BY ID - Should respond 200 for Joel', done => {
  request
    .get('/musicians/joel')
    .expect('Content-Type', /json/)
    .expect(200, joel, done);
});

it('GET BY ID - Should respond 200 with update for Muddy', done => {
  request
    .get('/musicians/waters')
    .expect('Content-Type', /json/)
    .expect(200, muddy, done);
});
