//initiate the plugin and pass the id of the div containing gallery images
$(document).ready(function() {
	$("#img_01").elevateZoom({
		gallery:'img_01',
		cursor: 'pointer', 
		galleryActiveClass: 'active', 
		imageCrossfade: true, 
		loadingIcon: 'http://www.elevateweb.co.uk/spinner.gif'
	}); 
	$(".fancybox-thumb").fancybox({
		prevEffect	: 'none',
		nextEffect	: 'none',
		helpers	: {
			title	: {
				type: 'outside'
			},
			thumbs	: {
				width	: 50,
				height	: 50
			}
		}
	});
});
//pass the images to Fancybox