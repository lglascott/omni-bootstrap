define('omni-coupon-model', [
	'omni',
], function(
	omni
) {

	"use strict";

	function Coupon(data) {
		this.data = data;
	}

	Coupon.prototype = {
		discountPercentage: function(){ return (this.data.discount_amount * 100).toString() + '%'; },
		buildingName: function(){ return this.data.building_name; },
		isFacebookPromo: function(){ return this.code().indexOf("facebook") >= 0; },
		code: function() { return this.data.code }
	};

	omni.models.Coupon = Coupon;
	return Coupon;

});