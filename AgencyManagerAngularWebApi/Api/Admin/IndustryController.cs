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
    public class IndustryController : ApiController
    {
        private IndustryRepository IndustryRepository;

        public IndustryController()
        {
            IndustryRepository = new IndustryRepository(new AgencyManagerContext());
        }

        // GET: api/Agency
        public IEnumerable<Industry> Get()
        {
            return IndustryRepository.GetIndustrys().ToList();
        }

        // GET: api/Agency/5
        public Industry Get(int id)
        {
            return IndustryRepository.GetIndustryByID(id);
        }

        // POST: api/Agency
        public void Post([FromBody]Industry value)
        {
            if (value.Id == 0)
            {
                IndustryRepository.InsertIndustry(value);
            }
            else
            {
                IndustryRepository.UpdateIndustry(value);
            }

            IndustryRepository.Save();
        }

        // PUT: api/Agency/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Agency/5
        public void Delete(int id)
        {
            IndustryRepository.DeleteIndustry(id);
            IndustryRepository.Save();
        }
    }
}