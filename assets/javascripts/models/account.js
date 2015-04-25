define('omni-account-model', [
	'omni'
], function(
	omni
) {

	"use strict";

	function Account(data) {
		this.data = data;
	}

	Account.prototype = {
		name: function(){ return this.data.name; },
		phone: function() { return this.data.phone; }
	};

	omni.models.Account = Account;
	return Account;

});