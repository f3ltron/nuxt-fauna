export const createFn = async function createFn({ collection, data }) {
  try {
    const ret = await this.client.query(
      this.q.Create(this.q.Collection(collection), { data })
    )
    return ret
  } catch (e) {
    throw new Error(e)
  }
}

export const deleteFn = async function deleteFn({ collection, id }) {
  try {
    const ret = await this.client.query(
      this.q.Delete(this.q.Ref(this.q.Collection(collection), id))
    )
    return ret
  } catch (e) {
    throw new Error(e)
  }
}

export const readFn = async function readFn({ collection, id }) {
  try {
    const ret = await this.client.query(
      this.q.Get(this.q.Ref(this.q.Collection(collection), id))
    )
    return ret
  } catch (e) {
    throw new Error(e)
  }
}

export const readCollectionsFn = async function readCollectionsFn({
  collections = [],
}) {
  const buildCollection = (collection) => {
    return this.q.Map(
      this.q.Paginate(this.q.Documents(this.q.Collection(collection))),
      this.q.Lambda((x) => this.q.Get(x))
    )
  }
  try {
    const data = await this.client.query(
      collections.map((c) => buildCollection(c))
    )
    const final = {}
    collections.forEach((c, index) => {
      final[c] = data[index]
    })
    return final
  } catch (e) {
    throw new Error(e)
  }
}

export const updateFn = async function updateFn({ collection, id, data }) {
  try {
    const ret = await this.client.query(
      this.q.Update(this.q.Ref(this.q.Collection(collection), id), {
        data,
      })
    )
    return ret
  } catch (e) {
    throw new Error(e)
  }
}
