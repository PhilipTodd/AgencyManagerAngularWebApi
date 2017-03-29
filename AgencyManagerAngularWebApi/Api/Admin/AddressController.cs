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
    public class AddressController : ApiController
    {
        private AddressRepository AddressRepository;

        public AddressController()
        {
            AddressRepository = new AddressRepository(new AgencyManagerContext());
        }

        // GET: api/Agency
        public IEnumerable<Address> Get()
        {
            return AddressRepository.GetAddresss().ToList();
        }

        // GET: api/Agency/5
        public Address Get(int id)
        {
            return AddressRepository.GetAddressByID(id);
        }

        // POST: api/Agency
        public void Post([FromBody]Address value)
        {
            if (value.Id == 0)
            {
                AddressRepository.InsertAddress(value);
            }
            else
            {
                AddressRepository.UpdateAddress(value);
            }

            AddressRepository.Save();
        }

        // PUT: api/Agency/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Agency/5
        public void Delete(int id)
        {
            AddressRepository.DeleteAddress(id);
            AddressRepository.Save();
        }
    }
}