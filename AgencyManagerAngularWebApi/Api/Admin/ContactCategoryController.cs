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
    public class ContactCategoryController : ApiController
    {
        private ContactCategoryRepository ContactCategoryRepository;

        public ContactCategoryController()
        {
            ContactCategoryRepository = new ContactCategoryRepository(new AgencyManagerContext());
        }

        // GET: api/Agency
        public IEnumerable<ContactCategory> Get()
        {
            return ContactCategoryRepository.GetContactCategorys().ToList();
        }

        // GET: api/Agency/5
        public ContactCategory Get(int id)
        {
            return ContactCategoryRepository.GetContactCategoryByID(id);
        }

        // POST: api/Agency
        public void Post([FromBody]ContactCategory value)
        {
            if (value.Id == 0)
            {
                ContactCategoryRepository.InsertContactCategory(value);
            }
            else
            {
                ContactCategoryRepository.UpdateContactCategory(value);
            }

            ContactCategoryRepository.Save();
        }

        // PUT: api/Agency/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Agency/5
        public void Delete(int id)
        {
            ContactCategoryRepository.DeleteContactCategory(id);
            ContactCategoryRepository.Save();
        }
    }
}