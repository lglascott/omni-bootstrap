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
		apt: function() { return this.data.apt; },
		street: function() { return this.data.street; }
	};

	omni.models.Address = Address;
	return Address;

});