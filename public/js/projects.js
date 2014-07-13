/* projects module */
var projectsModule = (function () {
  return {
    display: function () {
      var proj_mysite = $("#todos");
      proj_mysite.find("h2").prepend(todos.title);
      proj_mysite.find("span").text(todos.meta);
      proj_mysite.find("p").text(todos.synopsis);

      var proj_mysite = $("#mysite");
      proj_mysite.find("h2").prepend(mysite.title);
      proj_mysite.find("span").text(mysite.meta);
      proj_mysite.find("p").text(mysite.synopsis);

      var proj_famsite = $("#familySite");
      proj_famsite.find("h2").prepend(familySite.title);
      proj_famsite.find("span").text(familySite.meta);
      proj_famsite.find("p").text(familySite.synopsis);
    }
  };
})();


/* Usage */
projectsModule.display();
