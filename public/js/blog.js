// ==================== FUNCTIONS ======================
function retrieveBlogs(blog_sets) {
  var latest_blogs = {},
      month_yr,
      matches,
      long_date;

  // read blogs from file
  for(date_view in blogs){
    month_yr = blogs[date_view];
    if(month_yr[0].latest in month_yr[0]) {
      latest_blogs[date_view] = month_yr;
    }
    // Add dates into Archives section
    matches = month_yr[0].date.match(/(\w+)\s\d+,\s(\d+)/);
    long_date = matches[1] + " " + matches[2];
    $("ol#dates").append("<li><a id='" + date_view + "' href='#'>" + long_date + "</a></li>");
  }
  blog_sets.all = blogs;
  return latest_blogs;
};

function outputBlogs(myblogs){
  var blog = $(".blog-main"),
      blog_title = "<h4 class='blog-post-title'></h4>",
      blog_date = "<p class='blog-post-meta'></p>",
      blog_post = "<p class='posts'></p>",
      blog_div,
      post,
      counter = 0;    // track new id for each blog post

  // flush viewable blogs and replace with selected
  blog.children().remove();

  // display specified blogs
  for(var i=0; i < myblogs.length; i++){
    blog_div = "<div id='" + counter + "' class='blog-post'></div>";
    blog.append(blog_div);
    post = $("#" + counter++);
    post.append(blog_title);
    $(".blog-post-title:last").text(myblogs[i].topic);
    post.append(blog_date);
    $(".blog-post-meta:last").text(myblogs[i].date);
    post.append(blog_post);
    $(".posts:last").html(myblogs[i].post);
  }
}


// ==================== DOM Ready ======================

// retrieve latest blogs and all blogs
var blog_sets = {};
var latest_blogs = retrieveBlogs(blog_sets);
var all_blogs = blog_sets.all;
var date_views = Object.keys(latest_blogs);
// save date id
var newest = date_views[0];
// display latest blog
outputBlogs(latest_blogs[date_views[0]]);
// highlight default (latest) archived date
$("#"+newest).addClass("spotlight");

// view blog posts based on selected month and year date
$("a").click(function(){
  var val = $(this).attr("id");

  if(val != undefined){
    for(date_id in all_blogs){
      if(val === date_id){
	$("#"+val).addClass("spotlight");
      }
      else{
	$("#"+date_id).removeClass("spotlight");
      }
    }
    // display selected blogs
    outputBlogs(all_blogs[val]);
  }
});
