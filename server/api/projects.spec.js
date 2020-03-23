/* global describe beforeEach it */

const { expect } = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const Project = db.model('project');

describe('Project routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('/api/projects/', () => {
    const codysEmail = 'cody@puppybook.com';
    const title = 'Instadoc';
    let instadoc;

    beforeEach(async () => {
      instadoc = await Project.create({ title: 'Instadoc' });

      return Project.create({
        title: 'Algo',
      });
    });

    it('GET /api/projects', async () => {
      const res = await request(app)
        .get('/api/projects')
        .expect(200);

      expect(res.body).to.be.an('array');
      expect(res.body[0].title).to.be.equal(title);
    });

    it('POST /api/projects/', async () => {
      const res = await request(app)
        .post(`/api/projects/`)
        .send({ title: title })
        .expect(201);
    });
  }); // end describe('/api/users')
}); // end describe('User routes')
