const request = require("supertest");
const app = require("../src/app");
const User = require("../src/User/User");
const sequelize = require("../src/config/database");

beforeAll(() => {
  return sequelize.sync();
});

beforeEach(() => {
  return User.destroy({
    truncate: true,
  });
});

describe("User Register", () => {
  const validUser = () => {
    return request(app).post("/api/1.0/users").send({
      username: "user",
      email: "user@test.com",
      password: "password",
    });
  };
  it("Returns 200 Ok when signup request is valid", async () => {
    const res = await validUser();
    expect(res.status).toBe(200);
  });
  it("Returns success message when signup request is valid", async () => {
    const res = await validUser();
    expect(res.body.message).toBe("User created");
  });
  it("Saves the user in the database", async () => {
    await validUser();
    // Query the database to see if the user was saved
    const user = await User.findAll();
    expect(user.length).toBe(1);
  });
  it("Returns the saved user credentials from the database ", async () => {
    await validUser();
    const user = await User.findAll();
    // Query the database to see if the user was saved
    expect(user[0].username).toBe("user");
    expect(user[0].email).toBe("user@test.com");
  });
  it("Not saving the password as plain text", async () => {
    await validUser();
    // Query the database to see if the user was saved
    const user = await User.findAll();
    expect(user[0].password).not.toBe("password");
  });
});
