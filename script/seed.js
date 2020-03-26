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
    Project.create({ title: 'Test Ideas' }),
    Project.create({ title: 'Third Ideas' }),
  ]);

  const components = await Promise.all([
    Component.create({
      title: 'Div Component',
      htmlTag: 'div',
      textContent: 'Good Morning World!',
    }),
    Component.create({
      title: 'H1 Component',
      htmlTag: 'h1',
      textContent: 'Welcome to InstaStack',
    }),
    Component.create({
      title: 'Img Component',
      htmlTag: 'img',
      src:
        'https://images.unsplash.com/photo-1503803548695-c2a7b4a5b875?ixlib=rb-1.2.1&w=250&q=250',
    }),
    Component.create({
      title: 'Button Component',
      htmlTag: 'button',
      textContent: 'Click Me!',
    }),
    Component.create({
      title: 'Footer Component',
      htmlTag: 'footer',
      textContent: `Posted by ${User.email}`,
    }),
    Component.create({
      title: 'HTML Component',
      htmlTag: 'html',
    }),
    Component.create({
      title: 'List Component',
      htmlTag: 'ul',
      children: ['First item', 'Second Item', 'Third Item'],
    }),
    Component.create({
      title: 'Paragraph Component',
      htmlTag: 'p',
      textContent:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    }),
    Component.create({
      title: 'Navbar Component',
      htmlTag: 'navbar',
      children: ['Contact info'],
    }),
  ]);

  await users[0].addProjects(projects[0]);
  await users[1].addProjects(projects[1]);
  await users[0].addProjects(projects[2]);
  await users[1].addProjects(projects[3]);

  await projects[0].addComponents(components[0]);
  await projects[1].addComponents(components[1]);
  await projects[2].addComponents(components[1]);
  await projects[3].addComponents(components[1]);

  const userProjs = await users[0].getProjects();

  console.log('user projects are ', userProjs);
  const projectComponents = await projects[0].getComponents();
  console.log('This project has these components: ', projectComponents);
  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${projects.length} projects`);
  console.log(`seeded ${components.length} components`);

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
