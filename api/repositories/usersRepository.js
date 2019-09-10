const config = require('config');
const fs = require('file-system');
const { promisify } = require('util');
const readFilePromise = promisify(fs.readFile);

class usersRepository {
  constructor() {
    this.usersPath = config.get('usersPath');
  }

  async getUsers() {
    const users = await readFilePromise(this.usersPath, 'utf8');

    return JSON.parse(users);
  }
}

module.exports = new usersRepository();