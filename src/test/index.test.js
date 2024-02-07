const app = require("../app")
const supertest = require("supertest")
const config = require("../config/config")
const request = supertest(app)

const baseEndPoint = config.apiVersionUrl

describe("/test endpoint", () => {
    it("should return a response", async () => {
        const response = await request.get(baseEndPoint)
        expect(response.status).toBe(200)
        expect(response.text).toBe("All Ok");
    })
})