using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AgencyManager.DAL;
using AgencyManager.Models;
using AgencyManager.DAL.Repository;

namespace AgencyManager.Api
{
    public class ContactController : ApiController
    {
        private ContactRepository ContactRepository;

        public ContactController()
        {
            ContactRepository = new ContactRepository(new AgencyManagerContext());
        }

        // GET: api/Agency
        public IEnumerable<Object> Get([FromUri]ContactRepository.ContactCriteria criteria)
        {
            var result = ContactRepository.GetContacts(criteria).Select(contact => new
            {
                Id = contact.Id,
                Name = String.Format("{0} - {1}", contact.FirstName, contact.LastName)
            });

            return result.ToArray();
        }
        
        // GET: api/Agency/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Agency
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Agency/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Agency/5
        public void Delete(int id)
        {
        }
    }
}
