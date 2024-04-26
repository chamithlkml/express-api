import request from 'supertest'
import { faker } from '@faker-js/faker'
import should from 'should'
import app from '../src/server'
import { AuthAdminContext } from './shared/auth'

let authToken = '';

before(async () => {
  authToken = await AuthAdminContext();
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