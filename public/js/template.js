$.getJSON('public/texts/data.json', function(data){
  /************* GLOBAL *****************/
  // page tabs
  var template = "{{#info}}<a class='blog-nav-item' href={{url}}>{{name}}</a>{{/info}}";
  var html = Mustache.render(template, data);
  $(".blog-nav").html(html);

  // activate page tab after load
  var tabname = $(".blog-nav").attr("id");
  $("nav.blog-nav a:contains("+tabname+")").attr("class", "blog-nav-item active");

  // Add copyright info at the footer
  var myRights_html = Mustache.render("{{copyright}}", data);
  $("#copyright").append(myRights_html);


  /************* HOME ******************/
  // my name as a header 
  var myname_template = "<h2>{{myname}}</h2>";
  var myname_html = Mustache.render(myname_template, data);
  $("#myname").html(myname_html);


  /************* PORTFOLIO ******************/
  if(tabname === "Portfolio") {
    var easybox_tmp = "{{#prior_work}}<img src={{image}} alt={{title}} title={{title}} width='100px' height='100px' />{{/prior_work}}";
    var prior_work_html = Mustache.render(easybox_tmp, data);
    $(".col-lg-12").append(prior_work_html);

    // launching easybox
    $("img").on("click", function(){
      $.easybox([{url: $(this).attr("src"), caption: $(this).attr("alt")}]);
    });
  }
});
