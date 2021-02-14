const faunadb = require('faunadb')
const q = faunadb.query

exports.handler = async (req, res) => {
  const { collection, id, data } = req.body

  if (!collection || !id || !data)
    return res.status(500).json({
      message:
        'there is an error with parameter check documentation for more infos',
    })

  const client = new faunadb.Client({
    secret: process.env.FAUNA_KEY,
  })

  try {
    const ret = await client.query(
      q.Update(q.Ref(q.Collection(collection), id), {
        data,
      })
    )
    res.status(200).json(ret)
  } catch (e) {
    res.status(500).json(e)
  }
}
