const paginationRepository = require('../repositories/companiesRepository');
const httpErrors = require('http-errors');

class PaginationService {
  constructor({paginationRepository}) {
    this.paginationRepository = paginationRepository;
  }

  async getCompaniesItems() {
    return await this.paginationRepository.getCompaniesItems();
  }


  // async putCompaniesItems(dataCompany) {
  //   const companiesItems = await this.getCompaniesItems();
  //
  //
  //   const company = await this.companiesRepository.addCompany(dataCompany);
  //
  //   return company;
  // }
  //
  // _checkCompany(companies, name, email) {
  //   companies.forEach(company => {
  //
  //     if (company.name === name || company.email === email) {
  //       throw new httpErrors.Conflict('A company with this name or email already exists!');		// Error 409
  //     }
  //   });
  // }
}

module.exports = new PaginationService({paginationRepository});
