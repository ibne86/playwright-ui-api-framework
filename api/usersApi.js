export class usersApi {
  constructor(request) {
    this.request = request;
  }

  async getUsersList(page = 2) {
    const response = await this.request.get(`/api/users?page=${page}`);
    const body = await response.json();
    return { response, body };
  }

  async getSingleUser(id) {
    const response = await this.request.get(`/api/users/${id}`);
    const body = await response.json();
    return { response, body };
  }
}