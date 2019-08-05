module.exports = (host, datasetId, query = {}) => {
  if (!host) {
    throw new Error('"host" is a required parameter but is missing');
  }

  if (!datasetId) {
    throw new Error('"datasetId" is a required parameter but is missing');
  }

  const baseUrl = `https://${host}/api/v2/catalog/datasets/${datasetId}/exports/geojson`;
  const odsQueries = [];
  const where = [];

  if (query.token) {
    odsQueries.push(`access_token=${query.token}`);
  }

  if (query.outFields) {
    odsQueries.push(`select=${query.outFields}`);
  }

  if (query.where && query.where !== "1=1") {
    odsQueries.push(`where=${query.where}`);
  }

  if (query.resultRecordCount) {
    odsQueries.push(`rows=${query.resultRecordCount}`);
  }

  if (query.resultOffset) {
    odsQueries.push(`start=${query.resultOffset}`);
  }

  return odsQueries.length > 0 ? `${baseUrl}?${odsQueries.join("&")}` : baseUrl;
};
