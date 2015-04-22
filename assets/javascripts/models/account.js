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

	};

	omni.models.Account = Account;
	return Account;

});