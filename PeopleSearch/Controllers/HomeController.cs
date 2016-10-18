﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PeopleSearch.DAL;
using PeopleSearch.Models;

namespace PeopleSearch.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetPeople()
        {
            PersonContext e = new PersonContext();
            var result = e.People.ToList();
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public void PostPerson(Person person)
        {
            PersonContext p = new PersonContext();
            p.People.Add(person);
            p.SaveChanges();

        }

    }
}