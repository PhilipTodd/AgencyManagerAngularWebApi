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
    public class AgentController : ApiController
    {
        private AgentRepository agentRepository;

        public AgentController()
        {
            agentRepository = new AgentRepository(new AgencyManagerContext());
        }

        // GET: api/Agency
        public IEnumerable<Object> Get()
        {
            List<Agent> agents = new List<Agent>();

            agentRepository.GetAgents().ToList().ForEach(agent =>
            {
                agents.Add(agent);
            });

            var result = agents.Select(agent =>
                new {
                    Id = agent.Id,
                    Name = agent.Name
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
