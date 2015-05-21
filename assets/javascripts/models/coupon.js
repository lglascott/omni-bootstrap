define('omni-coupon-model', [
	'omni'
], function(
	omni
) {

	"use strict";

	Coupon.isValidCode = function(code) {
		return /^[\w\d\-]{6,}$/i.test(code)
	};

	function Coupon(data) {
		this.data = data;
	}

	Coupon.prototype = {
		code: function() { return this.data.code || ''; }
	};

	omni.models.Coupon = Coupon;
	return Coupon;

});