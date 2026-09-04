export class UserApi {
  constructor(request) {
    this.request = request;

    this.baseURL = process.env.API_URL;

    this.defaultOptions = {
      headers: {
        'x-api-key': process.env.REQRES_API_KEY || '',
      },
    };
  }

  async createUser(userData) {
    return await this.request.post(`${this.baseURL}/api/users`, {
      data: userData,
      ...this.defaultOptions
    });
  }

  async getUser(userId) {
    return await this.request.get(`${this.baseURL}/api/users/${userId}`,this.defaultOptions
    );
  }

  async updateUser(userId, userData) {
    return await this.request.put(`${this.baseURL}/api/users/${userId}`, {
      data: userData,
        ...this.defaultOptions
    });
  }
}
