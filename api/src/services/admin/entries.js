import { entryColumns } from '../../hooks/relations'
import User from '../../models/users'

export default (app) => {
  const service = {
    find: async (params) => {
      app.info(params)
      const farms = await User.relatedQuery('farms')
        .for(params.query.userId)
        .select(entryColumns('farms'))
      const depots = await User.relatedQuery('depots')
        .for(params.query.userId)
        .select(entryColumns('depots'))
      const initiatives = await User.relatedQuery('initiatives')
        .for(params.query.userId)
        .select(entryColumns('initiatives'))
      return farms.concat(depots).concat(initiatives)
    },
  }

  app.use('/admin/entries', service)

  app
    .service('entries')
    .hooks({
      before: {
        all: [],
        find: [],
      },
      after: {
        all: [],
        find: [],
      },
      error: {
        all: [],
        find: [],
      },
    })
    .hooks({
      after: {
        all: [],
      },
    })
}
