import createService from 'feathers-objection'
import { disallow, iffElse } from 'feathers-hooks-common'

import Farm from '../models/farms'
import toGeoJSON from '../hooks/geoJson'
import {
  entryColumns,
  selectActiveEntries,
  relate,
  relateOwner,
  selectEntryColumns,
  withEager,
} from '../hooks/relations'
import { setCreatedAt, setUpdatedAt } from '../hooks/audit'
import { sendNewEntryNotification } from '../hooks/email'
import filterAllowedFields from '../hooks/filterAllowedFields'
import refreshSearchIndex from '../hooks/refreshSearchIndex'

export default (app) => {
  const service = createService({
    model: Farm,
    allowedEager: '[depots, products, ownerships, badges]',
    whitelist: ['$eager', '$select', '$details'],
    eagerFilters: [
      {
        expression: 'depots',
        filter: (builder) => {
          builder.select(entryColumns('depots'))
        },
      },
      {
        expression: 'products',
        filter: (builder) => {
          builder.select(['products.id', 'category', 'name'])
        },
      },
      {
        expression: 'ownerships',
        filter: (builder) => {
          builder.select(['users.id', 'email', 'name', 'origin', 'baseurl'])
        },
      },
      {
        expression: 'badges',
        filter: (builder) => {
          builder.select(['badges.id', 'name', 'category', 'url', 'logo'])
        },
      },
    ],
  })

  app.use('/farms', service)

  app
    .service('farms')
    .hooks({
      before: {
        all: [],
        find: [
          iffElse(
            (ctx) => ctx.params.query.$details !== 'true',
            [withEager('[products]'), selectEntryColumns],
            [withEager('[depots, products, badges]')]
          ),
          (ctx) => {
            delete ctx.params.query.$details
            return ctx
          },
          selectActiveEntries,
        ],
        get: [withEager('[depots, products, badges]'), selectActiveEntries],
        create: [setCreatedAt],
        update: [disallow()],
        patch: [setUpdatedAt],
        remove: [],
      },
      after: {
        all: [],
        find: [],
        get: [],
        create: [
          relate(Farm, 'products'),
          relate(Farm, 'badges'),
          relate(Farm, 'depots'),
          relateOwner,
          sendNewEntryNotification,
        ],
        patch: [
          relate(Farm, 'products'),
          relate(Farm, 'badges'),
          relate(Farm, 'depots'),
        ],
        remove: [],
      },
      error: {
        all: [],
        find: [],
        get: [],
        create: [],
        patch: [],
        remove: [],
      },
    })
    .hooks({
      after: {
        all: [filterAllowedFields, refreshSearchIndex, toGeoJSON('depots')],
      },
    })
}
