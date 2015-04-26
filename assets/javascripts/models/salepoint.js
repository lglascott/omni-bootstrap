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
		title: function(){ return this.data.title; },
		street: function(){ return this.data.street; }
	};

	omni.models.SalePoint = SalePoint;
	return SalePoint;

});