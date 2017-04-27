using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AgencyManager.Models;

namespace AgencyManager.DAL
{
    public class AgencyManagerInitialiser : System.Data.Entity.DropCreateDatabaseIfModelChanges<AgencyManagerContext>
    //public class AgencyManagerInitialiser : System.Data.Entity.DropCreateDatabaseAlways<AgencyManagerContext>
    {
        protected override void Seed(AgencyManagerContext context)
        {
            var companyCategories = new List<CompanyCategory>()
            {
                new CompanyCategory() { Name="Recruitment" },
                new CompanyCategory() { Name="Client" },
                new CompanyCategory() { Name="Agent" },
            };

            companyCategories.ForEach(cat => context.CompanyCategories.Add(cat));
            context.SaveChanges();

            var contactCategories = new List<ContactCategory>()
            {
                new ContactCategory() { Name="Recruiter" },
                new ContactCategory() { Name="CEO" },
                new ContactCategory() { Name="Dev manager" },
            };

            contactCategories.ForEach(cat => context.ContactCategories.Add(cat));
            context.SaveChanges();

            var industries = new List<Industry>()
            {
                new Industry() { Name="Banking" },
                new Industry() { Name="Energy" },
                new Industry() { Name="IT services" },
            };

            industries.ForEach(ind => context.Industries.Add(ind));
            context.SaveChanges();

            var agencies = new List<Agent>()
            {
                new Agent() { Name="PSL Recruitment" },
                new Agent() { Name="Dodgy Brothers" },
                new Agent() { Name="Hays" },
                new Agent() { Name="Randstad" },
            };

            agencies.ForEach(a => context.Agents.Add(a));
            context.SaveChanges();

            var companies = new List<Company>()
            {
                new Company() {
                    Name ="Commbank",
                    CompanyCategoryId=1,
                    IndustryId=1,
                },
                new Company() {
                    Name ="Telstra",
                    CompanyCategoryId =2,
                    IndustryId=2,
                },
                new Company() {
                    Name ="Macquarie",
                    CompanyCategoryId =3,
                    IndustryId=1,
                },
            };

            companies.ForEach(a => context.Companies.Add(a));
            context.SaveChanges();

            // agents
            var contacts = new List<Contact>()
            {
                new Contact() {
                    FirstName ="James",
                    LastName ="Kirk",
                    Email ="james.kirk@enterprice.com",
                    ContactType ="AGENT",
                    AgentId=1,
                    ContactCategoryId=1
                },

                new Contact() {
                    FirstName ="Pavel",
                    LastName ="Chekov",
                    Email ="viktor.checkov@enterprice.com",
                    ContactType ="AGENT",
                    AgentId=1,
                    ContactCategoryId=1
                },

                new Contact() {
                    FirstName ="Leonard",
                    LastName ="McCoy",
                    Email ="leonard.mccoy@enterprice.com",
                    ContactType ="AGENT",
                    AgentId=1,
                    ContactCategoryId=1
                },

                new Contact() {
                    FirstName ="Montgomery",
                    LastName ="Scott",
                    Email ="montgomery.scott@enterprice.com",
                    ContactType ="AGENT",
                    AgentId=1,
                    ContactCategoryId=1
                },

                new Contact() {
                    FirstName ="",
                    LastName ="Spock",
                    Email ="spock@enterprice.com",
                    ContactType ="AGENT",
                    AgentId=2,
                    ContactCategoryId=1
                },

                new Contact() {
                    FirstName ="Nyota",
                    LastName ="Uhuru",
                    Email ="nyota.uhuru@enterprice.com",
                    ContactType ="AGENT",
                    AgentId=2,
                    ContactCategoryId=1
                },

                // contacts
                new Contact() {
                   FirstName ="Hikaru",
                    LastName ="Sulu",
                    Email ="hikaru.sulu@enterprice.com",
                    ContactType ="COMPANY",
                    CompanyId=1,
                    ContactCategoryId=2
               },

            };

            contacts.ForEach(contact => context.Contacts.Add(contact));
            context.SaveChanges();

            var conversations = new List<Conversation>()
            {
                new Conversation() { ContactId = 1, Notes = "Harry called about new role - sounds good.", Time = DateTime.Now },
                new Conversation() { ContactId = 1, Notes = "Never mind, it's a dud. No potential whatsoever.", Time = DateTime.Now.AddHours(-2) },
                new Conversation() { ContactId = 1, Notes = "We're on again!", Time = DateTime.Now.AddHours(-3)},
            };

            conversations.ForEach(conversation => context.Conversations.Add(conversation));
            context.SaveChanges();

            var positions = new List<Position>()
            {
                new Position() { ContactId = 1, Title = "Senior dev", Skills = "C#, AngularJS, SQL Server", Responsibilities = "Dev only" },
                new Position() { ContactId = 1, Title = "Team lead", Skills = "C#, Jquery, MongoDB", Responsibilities = "Dev and lead" },
                new Position() { ContactId = 1, Title = "Dev manager", Skills = "People management", Responsibilities = "Run department" },
            };

            positions.ForEach(position => context.Positions.Add(position));
            context.SaveChanges();

        }
    }
}