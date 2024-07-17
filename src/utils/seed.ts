// eslint-disable-next-line import/no-unresolved
import { faker } from '@faker-js/faker/locale/ar';

import { connect } from '../database/connect';
import { FileModel } from '../database/models/file.model';
import { LogoModel } from '../database/models/logo.model';

import 'dotenv/config';

async function createLogo() {
  //set localizations

  const file = await FileModel.create({
    name: `logo-${faker.number.int({ min: 1, max: 1000 })}`,
    link: faker.image.url(),
    type: ['svg', 'ai', 'eps'][faker.number.int({ min: 0, max: 2 })],
    size: faker.number.int({ min: 100, max: 1000 })
  });

  const logo = await LogoModel.create({
    name: faker.company.name(),
    description: faker.lorem.paragraph(),
    email: faker.internet.email(),
    approved: faker.datatype.boolean(0.5),
    label: ['new', 'old', 'none'][faker.number.int({ min: 0, max: 2 })],
    tags: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
    author: faker.person.fullName(),
    fileId: file._id
  });
  return logo;
}

export async function seed() {
  await LogoModel.deleteMany({});
  await FileModel.deleteMany({});

  for (let i = 0; i < 100; i++) {
    await createLogo();
  }
  console.log('Seeded');
}

connect().then(() => {
  seed().then(() => {
    process.exit(0);
  });
});
