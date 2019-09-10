const usersRepository = require('../repositories/usersRepository');

class usersService {
  constructor({usersRepository}) {
    this.usersRepository = usersRepository;
  }

  async getUsers() {
    return await this.usersRepository.getUsers();
  }
}

module.exports = new usersService({usersRepository});