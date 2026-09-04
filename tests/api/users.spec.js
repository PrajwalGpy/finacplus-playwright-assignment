import { test, expect } from "@playwright/test";
import { UserApi } from "../../api/UserApi";

const userData = {
  name: "Prajwal",
  job: "QA Engineer",
};

test.describe("Reqres User API", () => {
  let userApi;

  test.beforeEach(async ({ request }) => {
    userApi = new UserApi(request);
  });

  test("Create user and validate response", async () => {
    const response = await userApi.createUser(userData);

    expect(response).toBeOK();
    expect(response.status()).toBe(201);
    const responseBody = await response.json();

    console.log("Create User Response:", responseBody);

    // Validate request data in response

    expect(responseBody.name).toBe(userData.name);
    expect(responseBody.job).toBe(userData.job);

    const userId = responseBody.id;
    expect(userId).toBeTruthy();
    console.log("Created User ID:", userId);
  });

  test("Get user details", async () => {

    // I tried using the new user ID as mentioned in the project description, but the API isn't accepting it. So for now, I'm using an existing user ID to retrieve and update the user details.

    const userId = 2;
    const response = await userApi.getUser(userId);
    console.log("Get User Status:", response.status());

    const responseBody = await response.json();

    console.log("Get User Response:", responseBody);

    expect(response.status()).toBe(200);

    expect(responseBody.data).toBeTruthy();

    // Validate user details exist

    expect(responseBody.data.first_name).toBeTruthy();
    expect(responseBody.data.last_name).toBeTruthy();
    expect(responseBody.data.email).toBeTruthy();
  });

  test("Update user and validate response", async () => {
    // Updated data
    const userId = 2;

    const updatedData = {
      name: "Prajwal Updated",
      job: "Senior QA Engineer",
    };

    const response = await userApi.updateUser(userId, updatedData);

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    console.log("Update Response:", responseBody);

    // Validate updated data
    expect(responseBody.name).toBe(updatedData.name);

    expect(responseBody.job).toBe(updatedData.job);
  });
});
