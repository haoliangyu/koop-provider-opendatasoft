/* eslint-env mocha */

const isSemver = require("is-semver");
const chai = require("chai");
const expect = chai.expect;

describe("index.js", function() {
  it("should export required properties and functions", () => {
    const provider = require("../src/index");

    expect(provider.type).to.equal("provider");
    expect(isSemver(provider.version)).to.equal(true);
    expect(provider.name).to.be.a("string");
    expect(provider.Model).to.be.a("function");
  });
});
