import createService from 'feathers-objection/lib/index'
import authentication from '@feathersjs/authentication/lib/index'

import Initiative from '../../app/models/initiatives'
import { featureCollection } from '../../app/util/jsonUtils'
import { restrictToUser, restrictToOwner } from '../../auth/hooks/authorization'
import { setCreatedAt } from '../hooks/audit'
import { connectGoals, connectOwner } from '../hooks/relations'

export default app => {
  const service = createService({
    model: Initiative,
    allowedEager: ['roles', 'goals']
  })

  const withEager = builder =>
    builder.eager('goals').modifyEager('goals', b => b.select(['name']))

  service.find = async () =>
    featureCollection(await withEager(Initiative.query()))
  service.get = async id => withEager(Initiative.query().findById(id))

  service.getWithOwnerships = async id =>
    Initiative.query()
      .findById(id)
      .eager('ownerships')

  app.use('/initiatives', service)

  app.service('initiatives').hooks({
    before: {
      create: [
        authentication.hooks.authenticate('jwt'),
        restrictToUser,
        setCreatedAt
      ],
      update: [authentication.hooks.authenticate('jwt'), restrictToOwner],
      patch: [authentication.hooks.authenticate('jwt'), restrictToOwner],
      remove: [authentication.hooks.authenticate('jwt'), restrictToOwner]
    },
    after: {
      create: [connectGoals, connectOwner]
    }
  })
}