(function($, deck, window, undefined) {
	var $d = $(document),
		$w = $(window),
		rootSlides,

	scaleDeck = function() {
		var $container = $[deck]('getContainer');

		// Scale each slide down if necessary (but don't scale up)
		$.each(rootSlides, function(i, $slide) {
			var containerWidth = $container.innerWidth(),
				containerHeight = $container.innerHeight(),
				scaleX = containerWidth / $w.innerWidth(),
				scaleY = containerHeight / $w.innerHeight(),
				scale = 1/Math.max(scaleX, scaleY);
			
			$.each('Webkit Moz O ms Khtml'.split(' '), function(i, prefix) {
				$container.css(prefix + 'Transform', 'scale(' + scale + ')');
			});
		});
	}

	$d.bind('deck.init', function() {
		var opts = $[deck]('getOptions'),
		slideTest = $.map([
			opts.classes.before,
			opts.classes.previous,
			opts.classes.current,
			opts.classes.next,
			opts.classes.after
		], function(el, i) {
			return '.' + el;
		}).join(', ');

		// Build top level slides array
		rootSlides = [];
		$.each($[deck]('getSlides'), function(i, $el) {
			if (!$el.parentsUntil(opts.selectors.container, slideTest).length) {
				rootSlides.push($el);
			}
		});

		$w.unbind('resize.deckscale').bind('resize.deckscale', scaleDeck)
		// Scale once on load, in case images or something change layout
		.unbind('load.deckscale').bind('load.deckscale', scaleDeck);
	});
})(jQuery, 'deck', this);

