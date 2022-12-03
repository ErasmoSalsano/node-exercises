const supertest = require("supertest");

const createApp = require("./app.js");

const app = createApp();

const request = supertest(app);

test("GET /", async () => {
  const response = await request.get("/")
    .expect(200) //ci aspettiamo uno status 200
    .expect("Content-Type", "text/html"); // Ci aspettiamo un header con "Content-Type", "text/html"

  expect(response.text).toEqual("<html><body><h1>We're on Mars!</h1></body></html>");
  // expect(response.text).toEqual("Content-Type", "text/html");
});
