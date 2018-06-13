import path from 'path'
import favicon from 'serve-favicon'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'

import feathers from '@feathersjs/feathers'
import configuration from '@feathersjs/configuration'
import express from '@feathersjs/express'

import db from './app/db'
import logger, { loggerHook } from './app/logger'

import authentication from './auth'
import entries from './entries'
import search from './search'

const setup = app => {
  app.configure(configuration())
  app.use(cors())
  app.use(helmet())
  app.use(compress())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.configure(logger)
  app.configure(express.rest())
}

const app = express(feathers())
app.configure(setup)
app.configure(db)
app.configure(authentication)
app.configure(entries)
app.configure(search)

app.use(favicon(path.join(app.get('public'), 'favicon.ico')))
app.use('/', express.static(app.get('public')))
app.use(express.notFound())
app.use(express.errorHandler(app.get('errorhandler')))

app.hooks({
  before: {
    all: [loggerHook()]
  },
  after: {
    all: [loggerHook()]
  },
  error: {
    all: [loggerHook()]
  }
})

export default app