/* eslint-disable import/no-extraneous-dependencies */
import { faker } from '@faker-js/faker'
import Initiative from '../../../models/initiatives'

export const initiativeData = () => ({
  url: faker.internet.url(),
  name: faker.company.name(),
  address: faker.address.streetAddress(),
  city: faker.address.city(),
  latitude: Number(faker.address.latitude()),
  longitude: Number(faker.address.longitude()),
  description: faker.lorem.sentence(),
  badges: [],
  goals: [],
})

export const insertInitiative = async () => {
  const initiative = initiativeData()
  return Initiative.query().insert(initiative)
}
