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
		orderNumber: function(){ return this.data.order_number; },
		scheduledDate: function(){ return new Date(this.data.scheduled_date + '  GMT-0000'); },
		timeSlot: function(){
			return new TimeSlot({ start: this.scheduledDate().getTime() });
		}
	};

	omni.models.SaleOrder = SaleOrder;
	return SaleOrder;

});