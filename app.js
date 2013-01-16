(function() {
	"use strict";
	
	function checkOrientation() {
		var width = $(window).width(),
			height = $(window).height(),
			isPortrait = (width < height);
		if (isPortrait) {
			$('body').addClass('portrait').removeClass('landscape');
		} else {
			$('body').addClass('landscape').removeClass('portrait');
		}
	}

	checkOrientation();
	window.addEventListener('resize', checkOrientation);

	$('#menu-button').bind('click', function() {
		$('body').toggleClass('left-menu');
	});
	$('#settings-button').bind('click', function() {
		$('body').toggleClass('right-menu');
	});

})();
