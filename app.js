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



	function clearView() {
		$('#content-content').empty();
	}
	function addViewTitle(title) {
		$('<h1></h1>').text(title).appendTo('#content-content');
	}
	function addViewSection(section) {
		var $section = $('<div></div>'),
			$header = $('<h2></h2>').text(section.line);
		$section.append($header);
		$section.append(section.text);
		$('#content-content').append($section);
	}

	$('#search-button').click(function() {
		var term = prompt('Open page:');
		loadWikiPage(term);
	});

	function loadWikiPage(term) {
		$.ajax({
			url: 'https://en.wikipedia.org/w/api.php',
			data: {
				format: 'json',
				action: 'mobileview',
				page: term,
				sections: 'all',
				prop: 'text|sections|normalizedtitle'
			},
			dataType: 'jsonp'
		}).done(function(data) {
			if (data.mobileview === undefined) {
				console.log('horrible error!');
				console.log(data);
			} else {
				clearView();
				addViewTitle(term);
				$.each(data.mobileview.sections, function(id, section) {
					/*
					console.log('----');
					console.log(section);
					console.log(id);
					*/
					addViewSection(section);
				});
			}
		});
	}

	$('#content').on('click', 'a', function(event) {
		var href = $(this).attr('href');
		event.preventDefault();
		event.stopPropagation();
		
		var matches = href.match(/^\/wiki\/(.*)$/);
		if (matches) {
			loadWikiPage(matches[1]);
		} else {
			if (href.substr(0, 2) == '//') {
				href = 'https:' + href;
			} else if (href.substr(0, 1) == '/') {
				href = 'https://en.wikipedia.org' + href;
			}
			window.open(href, "_blank");
		}
	});

	loadWikiPage('Main Page');
})();
