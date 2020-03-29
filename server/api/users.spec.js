/* eslint-disable no-unused-vars */
/* global describe beforeEach it */

// const { expect } = require('chai');
// const request = require('supertest');
const db = require('../db');
// const app = require('../index');
const User = db.model('user');

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com';
    // const projectName = 'algo beginner';
    let murphy;
    beforeEach(async () => {
      murphy = await User.create({ email: 'murphy@email.com' });

      return User.create({
        email: codysEmail,
      });
    });

    // it('GET /api/users', async () => {
    //   const res = await request(app)
    //     .get('/api/users')
    //     .expect(200);

    //   expect(res.body).to.be.an('array');
    //   expect(res.body[1].email).to.be.equal(codysEmail);
    // });

    // // new test
    // it('POST /api/users/:id/projects/', async () => {
    //   const res = await request(app)
    //     .post(`/api/users/${murphy.id}/projects/`)
    //     .send({ title: projectName })
    //     .expect(201);

    //   // test res later
    // });
  }); // end describe('/api/users')
}); // end describe('User routes')
