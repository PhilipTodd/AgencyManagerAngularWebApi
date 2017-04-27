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
        public IHttpActionResult Get()
        {
            return Ok(AddressRepository.GetAddresss().ToList());
        }

        // GET: api/Agency/5
        public IHttpActionResult Get(int id)
        {
            return Ok(AddressRepository.GetAddressByID(id));
        }

        // POST: api/Agency
        public IHttpActionResult Post([FromBody]Address value)
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

            return Ok();
        }

        // PUT: api/Agency/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Agency/5
        public IHttpActionResult Delete(int id)
        {
            AddressRepository.DeleteAddress(id);
            AddressRepository.Save();

            return Ok();
        }
    }
}