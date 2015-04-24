define('omni-timeslot-model', [
	'omni',
], function(
	omni
) {

	"use strict";

	function TimeSlot(data) {
		this.start = data.start;
		this.end = data.end;
		this.available = data.available;
	}

	omni.models.TimeSlot = TimeSlot;
	return TimeSlot;

});