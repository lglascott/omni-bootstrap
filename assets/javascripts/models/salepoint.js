define('omni-salepoint-model', [
	'omni'
], function(
	omni
) {

	"use strict";

	function SalePoint(data) {
		this.data = data;
	}

	omni.models.SalePoint = SalePoint;
	return SalePoint;

});