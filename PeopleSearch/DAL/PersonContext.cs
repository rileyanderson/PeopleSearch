using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using PeopleSearch.Models;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace PeopleSearch.DAL
{
    //Set up the DB Context
    public class PersonContext : DbContext
    {
        public PersonContext() : base("PersonContext")
        {
        }
            public DbSet<Person> People { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }

    }
}