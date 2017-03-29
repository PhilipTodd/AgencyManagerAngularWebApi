using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AgencyManager.DAL;
using AgencyManager.Models;
using AgencyManager.DAL.Repository;

namespace AgencyManager.Api.Admin
{
    public class CompanyCategoryController : ApiController
    {
        private CompanyCategoryRepository companyCategoryRepository;

        public CompanyCategoryController()
        {
            companyCategoryRepository = new CompanyCategoryRepository(new AgencyManagerContext());
        }

        // GET: api/Agency
        public IEnumerable<CompanyCategory> Get()
        {
            return companyCategoryRepository.GetCompanyCategorys().ToList();
        }

        // GET: api/Agency/5
        public CompanyCategory Get(int id)
        {
            return companyCategoryRepository.GetCompanyCategoryByID(id);
        }

        // POST: api/Agency
        public void Post([FromBody]CompanyCategory value)
        {
            if (value.Id == 0)
            {
                companyCategoryRepository.InsertCompanyCategory(value);
            }
            else
            {
                companyCategoryRepository.UpdateCompanyCategory(value);
            }

            companyCategoryRepository.Save();
        }

        // PUT: api/Agency/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Agency/5
        public void Delete(int id)
        {
            companyCategoryRepository.DeleteCompanyCategory(id);
            companyCategoryRepository.Save();
        }
    }
}