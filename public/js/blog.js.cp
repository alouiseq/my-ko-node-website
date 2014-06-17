// ==================== FUNCTIONS ======================
function retrieveBlogs(all_blogs) {
  var blog_one = {},
      blog_set = [],
      matches,
      long_date;

  // read blogs from file
  for(view in blogs){
    current_mo = blogs[view];
    current_mo.forEach(function(data, index) {
      blog_one.topic = data.topic;
      blog_one.date = data.date;
      blog_one.post = data.post;
      blog_set.push(blog_one)

      //  separate latest blog from others
      if(data[0].latest !== 'undefined') {
        all_blogs.latest = blog_set;
      }
      else {
        all_blogs.others.push(blog_set);
      }
    });
    // Add dates into Archives section
    matches = current_mo[0].date.match(/(\w+)\s\d+,\s(\d+)/);
    long_date = matches[1] + " " + matches[3];
    $("ol#dates").append("<li><a id='" + view + "' href='#'>" + long_date + "</a></li>");
  }
};

function outputBlogs(myblogs){
/*  var dates = options.date_matches || options.data[options.val].dates;
  var posts = options.post_matches || options.data[options.val].posts;
  var topic = options.topic || options.data[options.val].topic;
  var id = options.val || Object.keys(blogs)[0];  */

  var blog = $(".blog-main"),
      blog_title = "<h4 class='blog-post-title'></h4>",
      blog_date = "<p class='blog-post-meta'></p>",
      blog_post = "<p class='posts'></p>",
      blog_div,
      post,
      counter = 0;    // track new id for each blog post

  blog.children().remove();

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

var current_mo,
    latest_blogs = [],
    other_blogs = [];

var all_blogs = {
      latest: [],
      others: []
};

// retrieve blogs
retrieveBlogs(all_blogs);
latest_blog = all_blogs.latest;
other_blogs = all_blogs.others;

var newest = latest_blog[0];

// display latest blog
outputBlogs(latest_blog);

// the default (latest) archived date is highlighted
$("#"+newest).addClass("spotlight");

// view blog posts based on archived month and year date
$("a").click(function(){
  var val = $(this).attr("id");

  if(val != undefined){
    for(date_id in blogs){
      if(val === date_id){
	$("#"+val).addClass("spotlight");
      }
      else{
	$("#"+date_id).removeClass("spotlight");
      }
    }
    // display blogs
    outputBlogs(other_blogs);
  }
});
