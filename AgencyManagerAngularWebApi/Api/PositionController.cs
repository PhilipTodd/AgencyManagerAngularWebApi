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
    public class PositionController : ApiController
    {
        private PositionRepository PositionRepository;

        public PositionController()
        {
            PositionRepository = new PositionRepository(new AgencyManagerContext());
        }

        // GET: api/Agency
        public IHttpActionResult Get([FromUri]PositionRepository.PositionCriteria criteria)
        {
            var result = PositionRepository.GetPositions(criteria).Select(Position => new
            {
                Id = Position.Id,
                ContactId = Position.ContactId,
                Title = Position.Title,
                Responsibilities = Position.Responsibilities,
                Skills = Position.Skills,
            });

            return Ok(result.ToArray());
        }

        //public IEnumerable<Object> GetFiltered([FromUri]PositionRepository.PositionCriteria criteria)
        //{
        //    var result = PositionRepository.GetPositions(criteria).Select(Position => new
        //    {
        //        Id = Position.Id,
        //        Time = Position.Time,
        //        Notes = Position.Notes,
        //        ContactId = Position.ContactId,
        //    });

        //    return result.ToArray();
        //}

        // GET: api/Agency/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Agency
        public void Post([FromBody]Position value)
        {
            if (value.Id == 0)
            {
                PositionRepository.InsertPosition(value);
            }
            else
            {
                PositionRepository.UpdatePosition(value);
            }

            PositionRepository.Save();
        }

        // PUT: api/Agency/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Agency/5
        [HttpDelete]
        public void Delete(int id)
        {
            PositionRepository.DeletePosition(id);
            PositionRepository.Save();
        }
    }
}
