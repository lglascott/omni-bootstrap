define('omni-account-model', [
	'omni',
	'omni-address-model',
	'jquery'
], function(
	omni,
	Address,
	$
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
		pricingPlan: function(val) {
			if (val === undefined) return this.data.pricing_plan;
			else this.data.pricing_plan = val;
			return this;
		},
		hasPaymentCredentials: function() {
			return !!this.data.payment_credentials_filled;
		},
		hasPricingPlan: function() {
			return !!this.pricingPlan();
		},
		isBillable: function() {
			return this.hasPaymentCredentials() && this.hasPricingPlan();
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
		},
		fillProfile: function(values) {
			return $.extend({}, this.data, {
				first_name: this.firstName(),
				last_name: this.lastName(),
				email: this.email()
			}, values);
		}
	};

	omni.models.Account = Account;
	return Account;

});