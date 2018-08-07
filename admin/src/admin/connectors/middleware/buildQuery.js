import url from 'url'
import _ from 'lodash'

export default function createBuildQuery() {
  // Builds a new url using the request's url, filters, pagination, and sorting
  function urlWithQuery(req) {
    if (typeof req.url !== 'string') {
      throw new Error(`Request URL must be a string. Found ${req.url}`)
    }

    const query = Object.assign({}, req.filters, req.page && { page: req.page })

    if (req.sorting && req.sorting.length > 0) {
      req.sorting.forEach(field => {
        query[`$sort[${field.sortKey}]`] =
          field.sorted === 'ascending' ? '1' : '-1'
      })
    }

    const parsed = url.parse(req.url, true)
    parsed.search = undefined
    parsed.query = Object.assign({}, parsed.query, _.omit(query, 'limit'))

    return url.format(parsed)
  }

  return function buildQuery(next) {
    return {
      create: req => {
        req.url = urlWithQuery(req)
        return next.create(req)
      },
      read: req => {
        req.url = urlWithQuery(req)
        return next.read(req)
      },
      update: req => {
        req.url = urlWithQuery(req)
        return next.update(req)
      },
      delete: req => {
        req.url = urlWithQuery(req)
        return next.delete(req)
      }
    }
  }
}
