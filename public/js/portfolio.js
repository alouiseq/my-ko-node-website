// workaround for triggering an anchor's link
$("input").on("click", function(){
  window.location.href = "#" + $(this).attr("class");
});
