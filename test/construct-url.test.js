/* eslint-env mocha */

const constructUrl = require("../src/construct-url.js");
const chai = require("chai");
const expect = chai.expect;

describe("construct-url.js", function() {
  it("should throw an error for the missing host", () => {
    expect(() => {
      constructUrl();
    }).to.throw();
  });

  it("should throw an error for the missing datasetId", () => {
    expect(() => {
      constructUrl("host");
    }).to.throw();
  });

  it("should construct a URL with the given host and datasetId", () => {
    const url = constructUrl("my-host", "my-dataset");
    expect(url).to.equal(
      "https://my-host/api/v2/catalog/datasets/my-dataset/exports/geojson"
    );
  });

  it("should construct a URL with token", () => {
    const url = constructUrl("my-host", "my-dataset", { token: "my_token" });
    expect(url).to.equal(
      "https://my-host/api/v2/catalog/datasets/my-dataset/exports/geojson?access_token=my_token"
    );
  });

  it("should construct a URL with where query", () => {
    const url = constructUrl("my-host", "my-dataset", {
      where: "field='my_value'"
    });
    expect(url).to.equal(
      "https://my-host/api/v2/catalog/datasets/my-dataset/exports/geojson?where=field='my_value'"
    );
  });

  it("should construct a URL with select query", () => {
    const url = constructUrl("my-host", "my-dataset", { outFields: "field" });
    expect(url).to.equal(
      "https://my-host/api/v2/catalog/datasets/my-dataset/exports/geojson?select=field"
    );
  });

  it("should construct a URL with select query", () => {
    const url = constructUrl("my-host", "my-dataset", { outFields: "field" });
    expect(url).to.equal(
      "https://my-host/api/v2/catalog/datasets/my-dataset/exports/geojson?select=field"
    );
  });

  it("should construct a URL with pagination", () => {
    const url = constructUrl("my-host", "my-dataset", {
      resultRecordCount: 10,
      resultOffset: 2
    });
    expect(url).to.equal(
      "https://my-host/api/v2/catalog/datasets/my-dataset/exports/geojson?rows=10&start=2"
    );
  });

  it("should not translate where=1=1", () => {
    const url = constructUrl("my-host", "my-dataset", { where: "1=1" });
    expect(url).to.equal(
      "https://my-host/api/v2/catalog/datasets/my-dataset/exports/geojson"
    );
  });
});
