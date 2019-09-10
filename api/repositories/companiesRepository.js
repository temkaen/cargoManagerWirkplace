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

  async getCompanyById(id) {
    const companies = await this.getCompanies();

    return companies.find(company => company.id === id);
  }

  async editCompany(id, dataCompany) {
    const companies = await this.getCompanies();
    const companyItem = companies.find(company => company.id === id);

    companyItem.name = dataCompany.name;
    companyItem.address = dataCompany.address;
    companyItem.contactPerson = dataCompany.contactPerson;
    companyItem.email = dataCompany.email;
    companyItem.phone = dataCompany.phone;

    await writeFilePromise(this.companiesPath, JSON.stringify(companies));

    return companies;
  }
}

module.exports = new CompaniesRepository();
