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
		window.location.hash = '#' + w + 'x' + h;
	}
	
	if (window.location.hash != '') {
		var hash = window.location.hash.substr(1),
			bits = hash.split('x');
		if (bits.length == 2) {
			var w = parseInt(bits[0], 10),
				h = parseInt(bits[1], 10);
			if (w > h) {
				portrait = false;
				width = h;
				height = w;
			} else {
				portrait = true;
				width = w;
				height = h;
			}
			setWindowSize();
		}
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