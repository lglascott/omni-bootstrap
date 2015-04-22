define('omni-salepoint-model', [
	'omni'
], function(
	omni
) {

	"use strict";

	function SalePoint(data) {
		this.data = data;
	}

	SalePoint.prototype = {

	};

	omni.models.SalePoint = SalePoint;
	return SalePoint;

});