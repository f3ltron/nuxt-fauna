export const createValidator = function createValidator({ collection }) {
  if (!collection)
    throw new Error('[FAUNA CREATE] collection should be specified')
}

export const deleteValidator = function deleteValidator({ collection, id }) {
  if (!collection)
    throw new Error('[FAUNA DELETE] collection should be specified')
  if (!id) throw new Error('[FAUNA DELETE] id should be specified')
}

export const readValidator = function readValidator({ collection, id }) {
  if (!collection)
    throw new Error('[FAUNA READ] collection should be specified')
  if (!id) throw new Error('[FAUNA READ] id should be specified')
}

export const updateValidator = function updateValidator({ collection, id }) {
  if (!collection)
    throw new Error('[FAUNA READ] collection should be specified')
  if (!id) throw new Error('[FAUNA READ] id should be specified')
}

export const readCollectionsValidator = function readCollectionsValidator({
  collections,
}) {
  if (!Array.isArray(collections))
    throw new Error('[FAUNA READ COLLECTIONS] collections should be array')
  if (collections.length <= 0)
    throw new Error('[FAUNA READ COLLECTIONS] collections length should > 0')
}
