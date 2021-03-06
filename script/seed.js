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
    Project.create({
      title: 'First Demo',
      usedContainers:
        '[{"w":12,"h":2,"x":0,"y":0,"i":"0","moved":false,"static":false},{"w":5,"h":5,"x":0,"y":2,"i":"1","moved":false,"static":false},{"w":7,"h":5,"x":5,"y":2,"i":"2","moved":false,"static":false}]',
      usedComponents:
        '[{"component":{"domId":"286","tag":"H1","title":"H1 Component","content":"Welcome to InstaStack","src":"","children":null},"i":"0"},{"component":{"domId":"774","tag":"UL","title":"List Component","content":"First itemSecond ItemThird Item","src":"","children":[{"tag":"LI","content":"First item"},{"tag":"LI","content":"Second Item"},{"tag":"LI","content":"Third Item"}]},"i":"1"},{"component":{"domId":"822","tag":"P","title":"Paragraph Component","content":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.","src":"","children":null},"i":"2"}]',
      usedStyles:
        '[{"styles":{"fontSize":"","color":"#d95959","borderStyle":"","borderWidth":"","borderColor":"","borderRadius":"","padding":"","backgroundColor":"00ffc8"},"i":"0","domId":"286"},{"styles":{"fontSize":10,"color":"#ff0004","borderStyle":"solid","borderWidth":"1px","borderColor":"","borderRadius":7,"padding":7,"backgroundColor":"f7fcfa"},"i":"2","domId":"822"}]',
    }),
    Project.create({ title: 'Sales Ideas' }),
    Project.create({ title: 'Test Ideas' }),
    Project.create({ title: 'Third Ideas' }),
  ]);

  const components = await Promise.all([
    Component.create({
      title: 'Div Component',
      displayName: 'div',
      htmlTag: 'div',
      textContent: 'Good Morning World!',
    }),
    Component.create({
      title: 'H1 Component',
      displayName: 'h1',
      htmlTag: 'h1',
      textContent: 'Welcome to InstaStack',
    }),
    Component.create({
      title: 'Img Component',
      htmlTag: 'img',
      displayName: 'img',
      src:
        'https://images.unsplash.com/photo-1503803548695-c2a7b4a5b875?ixlib=rb-1.2.1&w=250&q=250',
    }),
    Component.create({
      title: 'Button Component',
      displayName: 'button',
      htmlTag: 'button',
      textContent: 'Click Me!',
    }),
    Component.create({
      title: 'Footer Component',
      displayName: 'footer',
      htmlTag: 'footer',
      textContent: `Posted by ${User.email}`,
    }),
    Component.create({
      title: 'List Component',
      displayName: 'list',
      htmlTag: 'ul',
      children: ['First item', 'Second Item', 'Third Item'],
    }),
    Component.create({
      title: 'Paragraph Component',
      displayName: 'para',
      htmlTag: 'p',
      textContent:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    }),
    Component.create({
      title: 'Navbar Component',
      displayName: 'nav',
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
