import request from 'supertest'
import { faker } from '@faker-js/faker'
import should from 'should'
import app from '../src/server'
import { AuthContext } from './shared/auth'
import { LastProductId } from './shared/product'

let authToken = '';
let lastProductId: number;

before(async () => {
  authToken = await AuthContext('ADMIN');
  lastProductId = await LastProductId();
})

describe('POST /api/products', () => {
  it('Should create a product', (done) => {
    const productData = {
      name: faker.person.fullName(),
      description: faker.company.name(),
      price: faker.number.int(),
      tags: faker.color.human()
    }

    request(app)
      .post('/api/products')
      .send(productData)
      .set({ Authorization: authToken})
      .expect(200)
      .end((err, res) => {
        if(err) return done(err);

        should(res.body).have.property('id').and.be.a.Number();

        done();
      })
  })
})

describe('GET /api/products', () => {
  it('Should return an array of products', (done) => {
    request(app)
      .get('/api/products')
      .set({Authorization: authToken})
      .send()
      .expect(200)
      .end((err, res) => {
        if(err) return done(err);

        should(res.body).have.property('products').and.be.an.Array();
        done();
      });
  })
});

describe('PUT /api/products/:id', () => {
  const productData = {
    name: faker.person.fullName(),
    description: faker.company.name(),
    price: faker.number.int(),
    tags: faker.color.human()
  }
  it('Should update a product', (done) => {
    request(app)
    .put(`/api/products/${lastProductId}`)
    .set({Authorization: authToken})
    .send(productData)
    .expect(200)
    .end((err, res) => {
      if(err) return done(err);

      should(res.body).have.property('id').and.be.a.Number();

      done();
    })
  })
});