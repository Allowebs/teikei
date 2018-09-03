import createService from 'feathers-objection'
import { disallow } from 'feathers-hooks-common/lib'

import Initiative from '../models/initiatives'
import wrapFeatureCollection from '../hooks/geoJson'
import { setCreatedAt, setUpdatedAt } from '../hooks/audit'
import { relate, relateOwner, selectEntryColumns, withEager } from '../hooks/relations'
import { sendNewEntryNotification } from '../hooks/email'

export default app => {
  const service = createService({
    model: Initiative,
    allowedEager: '[goals, ownerships]',
    eagerFilters: [
      {
        expression: 'ownerships',
        filter: builder => {
          builder.select(['users.id', 'email', 'name'])
        }
      }
    ]
  })

  app.use('/initiatives', service)

  app.service('initiatives').hooks({
    before: {
      all: [
        // TODO this shouldn't be required
        ctx => {
          delete ctx.params.query.$select
          return ctx
        }
      ],
      find: [selectEntryColumns],
      get: [withEager('[goals]')],
      create: [setCreatedAt],
      update: [disallow()],
      patch: [setUpdatedAt],
      remove: []
    },

    after: {
      all: [],
      find: [wrapFeatureCollection],
      get: [],
      create: [relate(Initiative, 'goals'), relateOwner, sendNewEntryNotification],
      update: [],
      patch: [relate(Initiative, 'goals')],
      remove: []
    },

    error: {
      all: [],
      find: [],
      get: [],
      create: [],
      update: [],
      patch: [],
      remove: []
    }
  })
}
