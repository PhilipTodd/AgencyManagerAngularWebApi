using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Optimization;

namespace AgencyManager
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                "~/Scripts/jquery.unobtrusive*",
                "~/Scripts/jquery.validate*"));

            bundles.Add(new ScriptBundle("~/bundles/vendor").Include(
                "~/Scripts/Vendor/ui-bootstrap-tpls-2.2.0.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                "~/Scripts/angular.js",
                "~/Scripts/angular_1_router.js"));

            bundles.Add(new ScriptBundle("~/bundles/app")
                .IncludeDirectory("~/Scripts/Vendor", "*.js")
                .Include("~/Scripts/Vendor/ui-grid.js")
                .Include("~/Scripts/app/startUp.js")
                .IncludeDirectory("~/Scripts/app/Services", "*.js")
                .IncludeDirectory("~/Scripts/app/Views", "*.js")
                .IncludeDirectory("~/Scripts/app/Helpers", "*.js")
                .IncludeDirectory("~/Scripts/app/Views/Admin/", "*.js")
                .Include("~/Scripts/app/root.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                "~/Scripts/bootstrap.js",
                "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                 "~/Content/bootstrap.css",
                 "~/Content/ngNotificationsBar.css",
                 "~/Content/ui-grid.css",
                 "~/Content/Site.css"));
        }
    }
}
