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

    return this.companiesRepository.addCompany(dataCompany);
  }

  async changeCompanyStatus(idCompany) {
    return this.companiesRepository.putCompanyStatus(idCompany);
  }

  async editCompany(id, dataCompany) {
    const companies = await this.getCompanies();

    const companyItem = await this.companiesRepository.getCompanyById(id);

    const name = (companyItem.name !== dataCompany.name) ? dataCompany.name : undefined;
    const email = (companyItem.email !== dataCompany.email) ? dataCompany.email : undefined;

    this._checkCompany(companies, name, email);

    return this.companiesRepository.editCompany(id, dataCompany);
  }

  _checkCompany(companies, name, email) {
    companies.forEach(company => {

      if (company.name === name && company.email === email) {
        throw new httpErrors.Conflict('A company with this name and email already exists!');		// Error 409
      } else if(company.name === name) {
        throw new httpErrors.Conflict('A company with this name already exists!');
      } else if(company.email === email) {
        throw new httpErrors.Conflict('A company with this email already exists!');
      }
    });
  }
}

module.exports = new CompaniesService({companiesRepository});
