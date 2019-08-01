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
});
