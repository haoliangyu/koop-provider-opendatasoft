const fetch = require("node-fetch");
const constructUrl = require("./construct-url");

function OpenDataSoft(koop) {}

OpenDataSoft.prototype.getData = async function(req, callback) {
  const host = req.params.host;
  const datasetId = req.params.id;
  const query = Object.assign({}, req.query, req.body);

  try {
    const url = constructUrl(host, datasetId, query);
    const res = await fetch(url);

    if (res.ok) {
      const geojson = await res.json();

      geojson.filtersApplied = {
        where: true,
        offset: true,
        limit: true
      };

      callback(null, geojson);
    } else {
      callback(new Error(res.statusText));
    }
  } catch (e) {
    callback(e);
  }
};

module.exports = OpenDataSoft;
