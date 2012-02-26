(function($, deck, window, undefined) {
	var $d = $(document),
		$w = $(window);

	$.extend(true, $[deck].defaults, {
		keys: {
			fullscreen: 70 // f
		}
	});

	$[deck]('extend', 'disableFullscreen', function() {
		//$[deck]('getContainer').removeClass($[deck]('getOptions').classes.scale);
		//scaleDeck();
	});

	$[deck]('extend', 'enableFullscreen', function() {
		var $container = $d[0].body;
		//$[deck]('getContainer').addClass($[deck]('getOptions').classes.scale);
		if ($container.mozRequestFullScreen) {
			$container.mozRequestFullScreen();
		} else {
			$container.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
		}
	});

	$d.bind('deck.init', function() {
		var opts = $[deck]('getOptions');

		// Bind key events
		$d.unbind('keydown.deckfullscreen').bind('keydown.deckfullscreen', function(e) {
			if (e.which === opts.keys.fullscreen || $.inArray(e.which, opts.keys.fullscreen) > -1) {
				//$[deck]('toggleScale');
				$[deck]('enableFullscreen');
				e.preventDefault();
			}
		});
	});
})(jQuery, 'deck', this);