const { get, getOr, last } = require('lodash/fp');
const crypto = require('crypto');

async function createNodes(createNode, list, type) {
  list.forEach((node) => {
    node.parent = null;
    node.children = [];
    node.internal = {
      mediaType: 'application/json',
      type,
      contentDigest: crypto.createHash('md5').update(JSON.stringify(node)).digest('hex'),
      content: JSON.stringify(node),
    };

    createNode(node);
  });
}

module.exports.createNodes = createNodes;

/**
 * Get all paginated data from a query. Will execute multiple requests as
 * needed.
 */
async function queryAll(client, path, query, first, after, aggregatedResponse) {
  const data = await client.query(query, { first, after });
  const edges = getOr([], ['data', path, 'edges'], data);
  const nodes = edges.map((edge) => edge.node);

  aggregatedResponse = aggregatedResponse ? aggregatedResponse.concat(nodes) : nodes;

  if (get(['data', path, 'pageInfo', 'hasNextPage'], data)) {
    return queryAll(client, path, query, first, last(edges).cursor, aggregatedResponse);
  }

  return aggregatedResponse;
}

module.exports.queryAll = queryAll;
