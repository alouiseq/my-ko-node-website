// home module
var homeModule = (function () {
  return {
    masker: function () {
      // Mask and unmask image to display Me
      $("#masked").on("mousemove", function(event) {
	var x = event.clientX;
	var y = event.clientY;
	var mask = $('#mask1 circle');
	mask.attr('cy', y-80 + 'px');
	mask.attr('cx', x + 'px');
      });
    },

    unmasker: function () {
      // Unmask the hero within
      $("img#me").hover(function(){
	$("circle").attr({cx:'43%', cy:'23%', r:'150'});
      }, function(){
	$("circle").attr({cx:'-50%', cy:'-50%', r:'50'});
      });
    },

    textstand: function () {
      // toggle emphasis on text
      $("img").hover(function(){
	$(this).prev("p.plain").wrapInner("<strong></strong>");
	  
      }, function(){
	var strong_elem = $(this).prev("p.plain").children("strong");
	strong_elem.replaceWith(strong_elem.html());
      });
    },

    leftanimate: function () { 
      // animate left columns
      $("img:not('#me')").hover(function(){
	$(this).parent("div.col-left").stop().find("img").stop().animate({width:'220px', height:'220px'}, 1000);
      }, function(){
	$(this).parent("div.col-left").stop().find("img").stop().animate({width:'200px', height:'200px'}, 1000);
      });
    },

    othersanimate: function () { 
      // animate other columns
      $("a").hover(function(){
	$(this).parent("div").find("img").stop().animate({width:'220px', height:'220px'}, 1000);
	$(this).parent("div").find("strong").css('color', 'red');
      }, function(){
	$(this).parent("div").find("img").stop().animate({width:'200px', height:'200px'}, 1000);
	$(this).parent("div").find("strong").css('color', 'white');
      });
    }
  };
})();

// Run methods
homeModule.masker();
homeModule.unmasker();
homeModule.textstand();
homeModule.leftanimate();
homeModule.othersanimate();
