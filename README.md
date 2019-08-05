# koop-provider-opendatasoft

A [Koop](https://koopjs.github.io/) provider plugin to load data from a [OpenDataSoft](https://www.opendatasoft.com) data portal or the [Data Network](https://data.opendatasoft.com/explore) for public datasets.

This provider uses the [OpenDataSoft V2 API](https://data.opendatasoft.com/api/v2/console) to request raw data in GeoJSON format.

No configuration is required.

## Installation

```bash
npm install koop-provider-opendatasoft
```

## Use

Register the provider into your Koop app

```javascript
const Koop = require("koop");
const opendatasoft = require("koop-provider-opendatasoft");

const koop = new Koop();
koop.register(opendatasoft);
koop.server.listen(8080);
```

For example, with the default [Geoservices](https://github.com/koopjs/koop-output-geoservices) output, the OpenDataSoft data is available in every route like:

```
"Geoservices" output routes for the "opendatasoft" provider         Methods
------------------------------------------------------------------  ---------
/opendatasoft/:host/:id/FeatureServer/:layer/:method                GET, POST
/opendatasoft/:host/:id/FeatureServer/layers                        GET, POST
/opendatasoft/:host/:id/FeatureServer/:layer                        GET, POST
```

## Parameters

This provider requires two parameters in the route URL.

### host

The `host` parameter is the host name of the data repository. It could be your portal or OpenDataSoft's public dataset repository (`data.opendatasoft.com`).

### id

The `id` parameter is the dataset identifier of each OpenDatasoft dataset. It is available at the dataset's information page, for example, like [this](https://data.opendatasoft.com/explore/dataset/centres-pmi%40montreuil/information/).

### Query

The following query parameters are supported:

- token
- where
- outFields
- resultOffset
- resultRecordCount

## Example

Get all records from the dataset [Local Air Quality @ Town of Chapel Hill](https://data.opendatasoft.com/explore/dataset/local-air-quality%40townofchapelhill) from the [Data Network](https://data.opendatasoft.com/explore/)

```
GET http://localhost:8080/opendatasoft/rest/services/data.opendatasoft.com/local-air-quality@townofchapelhill/FeatureServer/0/query
```

## License

MIT
