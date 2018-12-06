$( document ).ready(function() {
	function configHeader() {
		$(window).scroll(function(){
	      if ($(this).scrollTop() > 280) {
	          $('header').addClass('fixed');
	      } else {
	          $('header').removeClass('fixed');
	      }
	  });

	    $(".icon-search-hidden").click(function(){
	        $(".search").toggleClass("active");
	    });
	    $(".setting-header-icon-hidden").click(function () {
	    	$(".block-info-header").toggleClass("active");
	    })
	    $(".category-list-icon-hidden").click(function () {
	    	$(".category-fixed").addClass("active");
	    })
	    $(".icon-delete-cate").click(function () {
	    	$(".category-fixed").removeClass("active");
	    })
	}
function data(count) {
	if ($(window).width() < 992) {
			$(`.title-info-main-footer${count}`).attr("data-toggle","collapse");
			$(`.title-info-main-footer${count}`).attr("data-target",`#collapse${count}`);
			$(`.block-info-footer-li${count}`).attr("id",`collapse${count}`);
			$(`.block-info-footer-li${count}`).addClass("collapse");
	}else{
			$(`.title-info-main-footer${count}`).removeAttr("data-toggle");
			$(`.title-info-main-footer${count}`).removeAttr("data-target");
			$(`.block-info-footer-li${count}`).removeAttr("id");
			$(`.block-info-footer-li${count}`).removeAttr("style");
			$(`.block-info-footer-li${count}`).removeClass("collapse");
			}
    	}
	for (var i = 0; i < 4; i++) {
				data(i)
			}
	$(window).on('resize', function(){
		var widthResize = $(window).width();
    if (widthResize < 992) {
   		function dataFooter2(count) {
				$(`.title-info-main-footer${count}`).attr("data-toggle","collapse");
				$(`.title-info-main-footer${count}`).attr("data-target",`#collapse${count}`);
				$(`.block-info-footer-li${count}`).attr("id",`collapse${count}`);
				$(`.block-info-footer-li${count}`).addClass("collapse");
		}
		for(var i=1;i<=3;i++){
			dataFooter2(i)
		}
    }else{
    	function removeDataFooter2(count) {
					$(`.title-info-main-footer${count}`).removeAttr("data-toggle");
					$(`.title-info-main-footer${count}`).removeAttr("data-target");
					$(`.block-info-footer-li${count}`).removeAttr("id");
					$(`.block-info-footer-li${count}`).removeAttr("style");

					$(`.block-info-footer-li${count}`).removeClass("collapse");
			}
	   		for(var i=1;i<=3;i++){
	   			removeDataFooter2(i)
	   		}
    	}
	});
	
	configHeader();
});