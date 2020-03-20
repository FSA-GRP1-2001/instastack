/* global describe beforeEach it */

const { expect } = require('chai');
const db = require('../index');
const Project = db.model('project'); // get project off the DB

describe('Project model', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('simple properties', () => {
    describe('has a title', () => {
      let algoBeginner;
      const titleString = 'Your first algo training website';

      beforeEach(async () => {
        algoBeginner = await Project.create({
          title: titleString,
        });
      });

      it('returns true if project exists in DB and has a title', () => {
        expect(algoBeginner.title).to.equal(titleString);
      });
    }); // end describe('has a title')
  }); // end describe('simple properties')
}); // end describe('Project model')
