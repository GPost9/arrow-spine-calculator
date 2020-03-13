'use strict'

const db = require('../server/db')
const {Bow, Arrow} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const bows = await Promise.all([
    Bow.create({
      centershot: 'on-center',
      drawWeight: 30,
      drawLength: 28
    }),
    Bow.create({
      centershot: 'past-center',
      drawWeight: 30,
      drawLength: 28
    })
  ])

  const arrows = await Promise.all([
    Arrow.create({
      material: 'carbon',
      spine: 500,
      arrowLength: 30,
      pointWeight: 145
    }),
    Arrow.create({
      material: 'aluminum',
      spine: 1916,
      arrowLength: 30,
      pointWeight: 145
    }),
    Arrow.create({
      material: 'wood',
      spine: 30 - 35,
      arrowLength: 30,
      pointWeight: 145
    })
  ])

  console.log(`seeded ${bows.length} bows`)
  console.log(`seeded ${arrows.length} arrows`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed