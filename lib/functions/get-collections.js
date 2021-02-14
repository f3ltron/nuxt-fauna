const faunadb = require('faunadb')
const q = faunadb.query

const buildCollection = function (collection) {
  return q.Map(
    q.Paginate(q.Documents(q.Collection(collection))),
    q.Lambda((x) => q.Get(x))
  )
}

exports.handler = async (req, res) => {
  const { collections } = req.body

  if (!collections || !Array.isArray(collections))
    return res.status(500).json({
      message: 'collections should be an array of collection name',
    })

  const client = new faunadb.Client({
    secret: process.env.FAUNA_KEY,
  })

  try {
    const data = await client.query(collections.map((c) => buildCollection(c)))
    const final = {}
    collections.forEach((c, index) => {
      final[c] = data[index]
    })
    return res.status(200).json(final)
  } catch (e) {
    return res.status(500).json(e)
  }
}
