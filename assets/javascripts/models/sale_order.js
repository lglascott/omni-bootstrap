define('omni-sale-order-model', [
	'omni',
	'omni-timeslot-model'
], function(
	omni,
    TimeSlot
) {

	"use strict";

	function SaleOrder(data) {
		this.data = data;
	}

	SaleOrder.prototype = {
		scheduledDate: function(){ return new Date(this.data.scheduled_date); },
		estimatedHours: function(){ return this.data.estimated_hours; },
		timeSlot: function(){
			var start = this.scheduledDate().getTime();
			var end = new Date(start);
			end = end.setHours(end.getHours() + this.estimatedHours());
			return new TimeSlot({ start: start, end: end });
		}
	};

	omni.models.SaleOrder = SaleOrder;
	return SaleOrder;

});