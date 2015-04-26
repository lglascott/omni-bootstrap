define('omni-account-model', [
	'omni',
	'omni-address-model'
], function(
	omni,
    Address
) {

	"use strict";

	function Account(data) {
		this.data = data;
	}

	Account.prototype = {
		name: function(){ return this.data.name; },
		firstName: function(){ return this.data.first_name; },
		lastName: function(){ return this.data.last_name; },
		email: function(){ return this.data.email; },
		paymentPlan: function(val) {
			if (val === undefined) return this.data.payment_plan;
			else this.data.payment_plan = val;
			return this;
		},
		phone: function(val) {
			if (val === undefined) return this.data.phone;
			else this.data.phone = val;
			return this;
		},
		hasAddress: function(){
			return !!this.address();
		},
		address: function(value){
			if (value === undefined)
				return this.data.address ? new Address(this.data.address) : null;
			else this.data.address = value;
			return this;
		}

	};

	omni.models.Account = Account;
	return Account;

});