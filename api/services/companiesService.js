const companiesRepository = require('../repositories/companiesRepository');
const httpErrors = require('http-errors');

class CompaniesService {
  constructor({companiesRepository}) {
    this.companiesRepository = companiesRepository;
  }

  async getCompanies() {
    return await this.companiesRepository.getCompanies();
  }

  async addCompany(dataCompany) {
    const companies = await this.getCompanies();

    this._checkCompany(companies, dataCompany.name, dataCompany.email);

    const company = await this.companiesRepository.addCompany(dataCompany);

    return company;
  }

  _checkCompany(companies, name, email) {
    companies.forEach(company => {

      if (company.name === name || company.email === email) {
        throw new httpErrors.Conflict('A company with this name or email already exists!');		// Error 409
      }
  });
  }
}

module.exports = new CompaniesService({companiesRepository});