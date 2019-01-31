$( document ).ready(function() {
    $(".category-bizmart .list-group-menu-1 li.list-group-menu-2").click(function () {
    	var listGroup2 = $("ul.sub-list-group-menu-2");
    	if (listGroup2.attr("style")) {
    		listGroup2.removeAttr("style");
    	}else{
    		listGroup2.attr("style","display:block");
    	}
    })
   // $(".category-bizmart ul.sub-list-group-menu-2 >li.list-group-menu-3").click(function () {
   //  	var listGroup2 = $("ul.sub-list-group-menu-3");
   //  	if (listGroup2.attr("style")) {
   //  		listGroup2.removeAttr("style");
   //  	}else{
   //  		listGroup2.attr("style","display:block");
   //  	}
   //  })
     
});