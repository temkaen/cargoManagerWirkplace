const config = require('config');
const fs = require('file-system');
const shortId = require('shortid');
const { promisify } = require('util');
const readFilePromise = promisify(fs.readFile);
const writeFilePromise = promisify(fs.writeFile);

class CompaniesRepository {
  constructor() {
    this.companiesPath = config.get('companiesPath');
  }

  async getCompanies() {
    const companies = await readFilePromise(this.companiesPath, 'utf8');

    return JSON.parse(companies);
  }

  async addCompany(dataCompany) {
    const companies = await this.getCompanies();

    const company = {
      id: shortId.generate(),
      name: dataCompany.name.trim(),
      address: dataCompany.address.trim(),
      contactPerson: dataCompany.contactPerson.trim(),
      email: dataCompany.email.trim(),
      phone: dataCompany.phone.trim(),
      status: 'Active'
    };

    companies.push(company);

    await writeFilePromise(this.companiesPath, JSON.stringify(companies));

    return company;
  }
}

module.exports = new CompaniesRepository();