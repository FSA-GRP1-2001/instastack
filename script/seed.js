'use strict';

const db = require('../server/db');
const { User } = require('../server/db/models');
const { Project } = require('../server/db/models');
const { Component } = require('../server/db/models');

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');

  const users = await Promise.all([
    User.create({
      email: 'cody@email.com',
      displayName: 'Cody',
      password: '123',
    }),
    User.create({
      email: 'murphy@email.com',
      displayName: 'Murphy',
      password: '123',
    }),
  ]);

  const projects = await Promise.all([
    Project.create({ title: 'First Demo' }),
    Project.create({ title: 'Sales Ideas' }),
  ]);

  const components = await Promise.all([
    Component.create({ title: 'List Component', htmlTag: 'ul' }),
    Component.create({
      title: 'Para Component',
      htmlTag: 'p',
      textContent: 'hello world!!',
    }),
    Component.create({
      title: 'Div Component',
      htmlTag: 'div',
      textContent: 'Good Morning World',
    }),
  ]);

  await users[0].addProject(projects[0]);
  await users[1].addProject(projects[1]);

  const userProjs = await users[0].getProject();
  console.log('user projects are ', userProjs);
  console.log(`seeded ${components.length} components`);
  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
