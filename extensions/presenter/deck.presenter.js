$(function() {
	var $current,
		$next,
		currentIndex,
		slidesWindow,
		$external,
		started;

	// Prevent click-through to slide iframes
	$(".slides-cover").bind("click", function(e) {
		e.preventDefault();
		e.stopPropagation();
		return false;
	});

	// Naive wait for iframes to load
	$("#next").bind("load", function(e) {
		// Load slides in a new window for external monitor
		openSlidesWindow();
	});

	// Load display
	function loadDisplay() {
		$current = $("#current")[0].contentWindow["$"];
		$next = $("#next")[0].contentWindow["$"];
		currentIndex = 0;
		started = false;

		// Move slides to initial positions
		$external.deck("go", currentIndex);
		$current.deck("go", currentIndex);
		$next.deck("go", currentIndex+1);

		// Update notes for the first time
		updateNotes();

		// Load clock
		loadClock();

		$(document).bind("keydown", function(e) {
			var options = $.deck.defaults;
			if (e.which === options.keys.next || $.inArray(e.which, options.keys.next) > -1) {
				e.preventDefault();

				if (!started) {
					// Start timer
					startTimer();
					started = true;
				}

				// Do nothing is this is the last slide
				if ($current.deck("getSlide", currentIndex+1) === null) {
					return;
				}

				$current.deck("go", ++currentIndex);
				$external.deck("go", currentIndex);

				var nextSlideIndex = currentIndex+1;
				if ($next.deck("getSlide", nextSlideIndex) !== null) {
					$next.deck("go", nextSlideIndex);
				} else {
					// Show black screen to signify end of deck
					$("#next").next(".slides-cover").addClass("end").html("End");
				}

				updateNotes();
			} else if (e.which === options.keys.previous || $.inArray(e.which, options.keys.previous) > -1) {
				e.preventDefault();

				if (currentIndex > 0) {
					$current.deck("go", --currentIndex);
					$external.deck("go", currentIndex);
					$next.deck("go", currentIndex+1);

					// Remove black screen over last slide (add conditional check here)
					$("#next").next(".slides-cover").removeClass("end").html("");

					updateNotes();
				}
			} else if (e.which == 116) {
				// Stop the laser button on my remote from causing a refresh
				e.preventDefault();
				e.stopPropagation();
			}
		});
	}

	// Update notes
	function updateNotes() {
		var notes = $(".notes"),
			currentNotes = $current(".deck-current .notes").html();

		notes.html(currentNotes);
	}

	// Open slide window
	function openSlidesWindow() {
		slidesWindow = window.open("../../slides/index.html", "presenter-display-"+(Math.random()*1), "width=800, height=600");

		// Wait until the slides have loaded
		$(slidesWindow).bind("load", function(e) {
			$external = slidesWindow["$"];
			$external("body").addClass("deck-presenter-iframe");
			loadDisplay();
		});
	}

	// Set up clock
	function loadClock() {
		var clock = $(".clock"),
			time;

		setInterval(function() {
			time = moment();
			clock.html(time.format("HH:mm:ss"));
		}, 1000);
	}

	// Start timer
	function startTimer() {
		var timer = $(".timer"),
			time = Date.now();

		setInterval(function() {
			var diffTime = Math.floor((Date.now()-time)/1000),
				diffHours = ("0"+(Math.floor(diffTime/60/60))).substr(-2),
				diffMinutes = ("0"+(Math.floor(diffTime/60)-(Math.floor(diffTime/60/60)*60))).substr(-2),
				diffSeconds = ("0"+(Math.floor(diffTime-Math.floor(diffTime/60)*60))).substr(-2);

			timer.html(diffHours+":"+diffMinutes+":"+diffSeconds);
		}, 1000);
	}
});