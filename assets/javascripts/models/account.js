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
		fullName: function(){
			return this.data.name;
		}
	};

	omni.models.Account = Account;
	return Account;

});