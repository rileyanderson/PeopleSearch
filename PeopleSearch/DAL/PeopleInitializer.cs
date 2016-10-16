using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using PeopleSearch.Models;

namespace PeopleSearch.DAL
{
    public class PeopleInitializer : System.Data.Entity.DropCreateDatabaseIfModelChanges<PersonContext>
    {
        protected override void Seed(PersonContext context)
        {
            var people = new List<Person>
            {
                new Person {FirstName= "Riley", LastName = "Anderson" },
                new Person {FirstName= "Bruce", LastName = "Wayne" },
            };
            people.ForEach(p => context.People.Add(p));
            context.SaveChanges();

        }
    }
}