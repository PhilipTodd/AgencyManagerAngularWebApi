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
    public class ConversationController : ApiController
    {
        private ConversationRepository ConversationRepository;

        public ConversationController()
        {
            ConversationRepository = new ConversationRepository(new AgencyManagerContext());
        }

        // GET: api/Agency
        public IHttpActionResult Get([FromUri]ConversationRepository.ConversationCriteria criteria)
        {
            var result = ConversationRepository.GetConversations(criteria).Select(Conversation => new
            {
                Id = Conversation.Id,
                Time = Conversation.Time,
                Notes = Conversation.Notes,
                ContactId = Conversation.ContactId,
            });

            return Ok(result.ToArray());
        }

        //public IEnumerable<Object> GetFiltered([FromUri]ConversationRepository.ConversationCriteria criteria)
        //{
        //    var result = ConversationRepository.GetConversations(criteria).Select(Conversation => new
        //    {
        //        Id = Conversation.Id,
        //        Time = Conversation.Time,
        //        Notes = Conversation.Notes,
        //        ContactId = Conversation.ContactId,
        //    });

        //    return result.ToArray();
        //}

        // GET: api/Agency/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Agency
        public void Post([FromBody]Conversation value)
        {
            if (value.Id == 0)
            {
                ConversationRepository.InsertConversation(value);
            }
            else
            {
                ConversationRepository.UpdateConversation(value);
            }

            ConversationRepository.Save();
        }

        // PUT: api/Agency/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Agency/5
        [HttpDelete]
        public void Delete(int id)
        {
            ConversationRepository.DeleteConversation(id);
            ConversationRepository.Save();
        }
    }
}
