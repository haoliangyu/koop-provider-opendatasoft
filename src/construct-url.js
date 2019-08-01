module.exports = (host, datasetId, queries = {}) => {
  if (!host) {
    throw new Error('"host" is a required parameter but is missing');
  }

  if (!datasetId) {
    throw new Error('"datasetId" is a required parameter but is missing');
  }

  let baseUrl = `https://${host}/api/v2/catalog/datasets/${datasetId}/exports/geojson`;

  return baseUrl;
};
