export class UserApi {
  constructor(request) {
    this.request = request;

    this.baseURL = process.env.API_URL;
  }

  async createUser(userData) {
    return await this.request.post(`${this.baseURL}/api/users`, {
      data: userData,
    });
  }

  async getUser(userId) {
    return await this.request.get(`${this.baseURL}/api/users/${userId}`);
  }

  async updateUser(userId, userData) {
    return await this.request.put(`${this.baseURL}/api/users/${userId}`, {
      data: userData,
    });
  }
}
