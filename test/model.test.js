/* eslint-env mocha */

const proxyquire = require("proxyquire");
const fetchMock = require("fetch-mock");
const chai = require("chai");
const expect = chai.expect;

describe("model.js", function() {
  it("should get a geojson from the getData() function", done => {
    const fetch = fetchMock.sandbox().getOnce("some-url", {
      type: "FeatureCollection",
      features: []
    });
    const Model = proxyquire("../src/model", {
      "./construct-url": (host, datasetId) => {
        expect(host).to.equal("my-host");
        expect(datasetId).to.equal("my-dataset");
        return "some-url";
      },
      "node-fetch": fetch
    });
    const model = new Model();
    const req = {
      params: {
        host: "my-host",
        id: "my-dataset"
      },
      query: {},
      body: {}
    };

    model.getData(req, (err, geojson) => {
      expect(err).to.equal(null);
      expect(geojson.type).to.equal("FeatureCollection");
      expect(geojson.features).to.be.an("array");
      done();
    });
  });

  it("should get queries from body", done => {
    const fetch = fetchMock.sandbox().getOnce("some-url", {
      type: "FeatureCollection",
      features: []
    });
    const Model = proxyquire("../src/model", {
      "./construct-url": (host, datasetId, query) => {
        expect(query.token).to.equal("my_token");
        return "some-url";
      },
      "node-fetch": fetch
    });
    const model = new Model();
    const req = {
      params: {
        host: "my-host",
        id: "my-dataset"
      },
      query: {},
      body: {
        token: "my_token"
      }
    };

    model.getData(req, (err, geojson) => {
      expect(err).to.equal(null);
      expect(geojson.type).to.equal("FeatureCollection");
      expect(geojson.features).to.be.an("array");
      done();
    });
  });

  it("should throw an error if the url construction fails", done => {
    const fetch = fetchMock.sandbox().get("*", 200);
    const Model = proxyquire("../src/model", {
      "./construct-url": () => {
        throw new Error();
      },
      "node-fetch": fetch
    });
    const model = new Model();
    const req = {
      params: {},
      body: {},
      query: {}
    };

    model.getData(req, (err, geojson) => {
      expect(err).to.be.an("error");
      expect(geojson).to.equal(undefined);
      expect(fetch.calls().length).to.equal(0);
      done();
    });
  });

  it("should throw an error if the request fails", done => {
    const Model = proxyquire("../src/model", {
      "./construct-url": () => "some-url",
      "node-fetch": fetchMock.sandbox().getOnce("some-url", 500)
    });
    const model = new Model();
    const req = {
      params: {},
      body: {},
      query: {}
    };

    model.getData(req, (err, geojson) => {
      expect(err).to.be.an("error");
      expect(geojson).to.equal(undefined);
      done();
    });
  });
});
