using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace AgencyManager
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            // default route modified and catch-all route added
            //http://stackoverflow.com/questions/4001081/asp-net-mvc-catch-all-route-and-default-route

            routes.MapRoute(
                "Default",
                "{controller}/{action}/{id}",
                new { controller = "Home", action = "Index", id = UrlParameter.Optional },
                new { controller = "Home" } // this is basically a regular expression
            );

            routes.MapRoute(
                "agencyHome",
                "{*url}",
                new { controller = "Home", action = "Index" }
            );
        }
    }
}
