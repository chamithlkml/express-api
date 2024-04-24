import request from 'supertest';
import { faker } from '@faker-js/faker';
import should from 'should'
import app from '../src/server';

const email = faker.internet.email();
const password = faker.internet.password();

describe('POST /api/auth/signup', () => {
  it('Should return status 200', (done) => {
    const userData: {
      email: string,
      password: string,
      first_name: string,
      last_name: string
    } = {
      email: email,
      password: password,
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName()
     };
     request(app)
            .post('/api/auth/signup')
            .send(userData)
            .expect(200)
            .end((err, res) => {
              if(err) return done(err);

              should(res.body).have.property('id').and.be.a.Number();

              done();
            });
  });
});

describe('POST /api/auth/signin', () => {
  it('Should return status 200', (done) => {
    const userData: {
      email: string,
      password: string
    } = {
      email: email,
      password: password
     };
     request(app)
            .post('/api/auth/signin')
            .send(userData)
            .expect(200)
            .end((err, res) => {
              if(err) return done(err);

              should(res.body).have.property('id').and.be.a.Number();

              done();
            });
  });
});