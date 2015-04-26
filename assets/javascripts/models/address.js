define('omni-address-model', [
	'omni'
], function(
	omni
) {

	"use strict";

	function Address(data) {
		this.data = data;
	}

	Address.prototype = {
		title: function() { return this.data.title; },
		apt: function() { return this.data.apt; },
		street: function() { return this.data.street; },
		zip: function() { return this.data.zip; }
	};

	omni.models.Address = Address;
	return Address;

});