using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PeopleSearch.Models
{
    public class Person
    {
        public int ID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int age { get; set; }
        public string address { get; set; }
        public string interests { get; set;}
        public byte[] image { get; set; }

    }
}