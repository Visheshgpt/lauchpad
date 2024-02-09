const app = require("../app");
const supertest = require("supertest");
const config = require("../config/config");
const request = supertest(app);
const mongoose = require("mongoose");

const baseEndPoint = config.apiVersionUrl;

describe("/test endpoint", () => {
  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("should return a response", async () => {
    const response = await request.get(baseEndPoint);
    expect(response.status).toBe(200);
    expect(response.text).toBe("All Ok");
  });
});
