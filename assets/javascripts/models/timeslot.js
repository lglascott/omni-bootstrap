define('omni-timeslot-model', [
	'omni',
], function(
	omni
) {

	"use strict";

	function TimeSlot(data) {
		this.data = data;
	}

	TimeSlot.prototype = {
		start: function() { return new Date(this.data.start); },
		end: function() { return new Date(this.data.end); },
		available: function() { return !!this.data.available; }
	};

	omni.models.TimeSlot = TimeSlot;
	return TimeSlot;

});