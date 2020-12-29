export default (app) => {
  app.jobs.schedule('refresh search index', '0/1 * * * *', async () => {
    app.info('CRON: refreshing search index - starting')
    await app.service('searchindex').create({})
    app.info('CRON: refreshing search index - done')
  })
}
