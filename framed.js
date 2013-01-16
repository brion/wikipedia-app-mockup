(function() {
	"use strict";
	
	var width = $('#frame').width(),
		height = $('#frame').height(),
		portrait = (height > width);

	function setWindowSize() {
		var w, h;
		if (portrait) {
			w = width;
			h = height;
		} else {
			w = height;
			h = width;
		}
		$('#frame').attr('width', w).attr('height', h);
	}
	
	$('#size').change(function() {
		var wh = $(this).val(),
			bits = wh.split('x');
		width = parseInt(bits[0], 10);
		height = parseInt(bits[1], 10);
		setWindowSize();
	});

	$('#rotate').click(function() {
		portrait = !portrait;
		setWindowSize();
	});

})();