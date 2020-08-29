import supertest from 'supertest';
import courses from './courses';

import app from './app';

const michael = {
  firstName: 'Michael',
  lastName: 'Physics',
  detail: 'COLE',
};

const joel = {
  firstName: 'Billy',
  lastName: 'Joel',
  detail: 'COLE',
};

const request = supertest(app);

it('GET ALL - Should respond 200 with all courses', done => {
  request
    .get('/courses')
    .expect('Content-Type', /json/)
    .expect(200, courses, done);
});

it('GET BY ID - Should respond 200 course by ID', done => {
  request
    .get('/courses/datastructures')
    .expect('Content-Type', /json/)
    .expect(200, courses.datastructures, done);
});

it('GET BY ID - Should respond 400 if course does not exist', done => {
  request
    .get('/courses/joel')
    .expect('Content-Type', /json/)
    .expect(400, done);
});

it('CREATE BY ID - Should respond 200 if course does not exist and create it', done => {
  request
    .put('/courses/joel')
    .send(joel)
    .expect('Content-Type', /json/)
    .expect(200, { id: 'joel' }, done);
});

it('CREATE BY ID - Should respond 400 if bad request data', done => {
  request
    .put('/courses/example')
    .send({
      firstName:
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
      lastName:
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
      detail: 'COLE',
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

it('PUT BY ID - Should respond 200 if course does exist and update it', done => {
  request
    .put('/courses/physics')
    .send(muddy)
    .expect('Content-Type', /json/)
    .expect(200, { id: 'physics' }, done);
});

it('PUT BY ID - Should respond 400 if bad update', done => {
  request
    .put('/courses/waters')
    .send({ detail: 'CHEMISTRY' })
    .expect('Content-Type', /json/)
    .expect(400, done);
});

it('GET BY ID - Should respond 200 for Joel', done => {
  request
    .get('/courses/joel')
    .expect('Content-Type', /json/)
    .expect(200, joel, done);
});

it('GET BY ID - Should respond 200 with update for Michael', done => {
  request
    .get('/courses/physics')
    .expect('Content-Type', /json/)
    .expect(200, michael, done);
});
