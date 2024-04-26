import request from 'supertest';
import { faker } from '@faker-js/faker';
import should from 'should'
import app from '../src/server';

const email = faker.internet.email();
const password = faker.internet.password();

describe('POST /api/auth/signup', () => {
  it('Should signup user', (done) => {
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
  it('Should sign in user', (done) => {
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
              should(res.body).have.property('token').and.be.a.String();
              done();
            });
  });
});

describe('GET /api/auth/me', () => {
  it('Should authenticate user with auth token', (done) => {
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
              should(res.body).have.property('token').and.be.a.String();

              const authToken: string = res.body.token;

              request(app)
                .get('/api/auth/me')
                .set('Authorization', authToken)
                .send()
                .expect(200)
                .end((err, res) => {
                  if(err) return done(err);

                  should(res.body).have.property('id').and.be.a.Number();

                  done();
                })
            });
  });
});