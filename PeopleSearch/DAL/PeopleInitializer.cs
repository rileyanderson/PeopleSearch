using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using PeopleSearch.Models;
using System.IO;
using System.Reflection;
using Newtonsoft.Json.Linq;
using System.Globalization;
using System.Drawing;


namespace PeopleSearch.DAL
{
    //***Important*** Drops and creates DB everytime it is run. Change to DropCreateDatabaseIfModelChanges to keep same DB across shutdowns
    public class PeopleInitializer : DropCreateDatabaseAlways<PersonContext> 
    {

        //Seeds the DB with people from a JSON file
        protected override void Seed(PersonContext context)
        {
            var people = new List<Person>{};

            string json = "";
            
            using (StreamReader r = new StreamReader(HttpContext.Current.Server.MapPath("~/People.json")))
            {
                json = r.ReadToEnd();
            }

            JObject joResponse = JObject.Parse(json);
            JArray array = (JArray)joResponse["results"];

            foreach (var person in array.Children())
            {
                string firstName = person["name"]["first"].ToString();
                string lastName = person["name"]["last"].ToString();
                string birthday = person["dob"].ToString();
                int age = getAge(birthday);

                string street = person["location"]["street"].ToString();
                string city = person["location"]["city"].ToString();
                string state = person["location"]["state"].ToString();
                string zip = person["location"]["postcode"].ToString();

                string address = street + Environment.NewLine + city + ", " + state + " " + zip;

                string interests = person["interests "].ToString();

                string picPathJson = person["picture"].ToString();
                string picturePath = HttpContext.Current.Server.MapPath(picPathJson);

                Image img = Image.FromFile(picturePath);
                byte[] arr;
                using (MemoryStream ms = new MemoryStream())
                {
                    img.Save(ms, System.Drawing.Imaging.ImageFormat.Jpeg);
                    arr = ms.ToArray();
                }

                string base64 = System.Convert.ToBase64String(arr);
                Person per = new Person { FirstName = firstName, LastName = lastName, age = age, address = address, interests = interests, image = base64 };
                context.People.Add(per);

            }
           
            context.SaveChanges();


        }

        //Get age from birthdate
        private int getAge(string age)
        {
            DateTime dob = DateTime.ParseExact(age, "yyyy-MM-dd HH:mm:ss", CultureInfo.InvariantCulture);
            var today = DateTime.Today;
            var returnAge = today.Year - dob.Year;
            if (dob > today.AddYears(-returnAge)) returnAge--;
  
            return returnAge;
        }

        private string getAddress(string[] location)
        {

            return "";
        }
    }
}