/*!
Deck JS - deck.scale
Copyright (c) 2011-2012 Caleb Troughton
Dual licensed under the MIT license and GPL license.
https://github.com/imakewebthings/deck.js/blob/master/MIT-license.txt
https://github.com/imakewebthings/deck.js/blob/master/GPL-license.txt
*/

/*
This module adds automatic scaling to the deck.  Slides are scaled down
using CSS transforms to fit within the deck container. If the container is
big enough to hold the slides without scaling, no scaling occurs. The user
can disable and enable scaling with a keyboard shortcut.

Note: CSS transforms may make Flash videos render incorrectly.  Presenters
that need to use video may want to disable scaling to play them.  HTML5 video
works fine.
*/
(function($, deck, window, undefined) {
	var $d = $(document),
		$w = $(window);

	$.extend(true, $[deck].defaults, {
		keys: {
			fullscreen: 70 // f
		}
	});

	/*
	jQuery.deck('disableFullscreen')

	Disables full screen and removes the class from the deck container.
	*/
	$[deck]('extend', 'disableFullscreen', function() {
		//$[deck]('getContainer').removeClass($[deck]('getOptions').classes.scale);
		//scaleDeck();
	});

	/*
	jQuery.deck('enableFullscreen')

	Enables full screen and adds the class to the deck container.
	*/
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