define('omni-payment-credential-model', [
	'omni'
], function(
	omni
) {

	"use strict";

	function PaymentCredential(data) {
		this.data = data;
	}

	PaymentCredential.prototype = {
		id: function(){ return this.data.id; },
		cardholderName: function(){ return this.data.cardholder_name; },
		cardNumber: function(){ return this.data.card_number; },
		expirationMonth: function(){ return this.data.expiration_month; },
		expirationYear: function(){ return this.data.expiration_year; },
		cardType: function(){ return this.data.card_type; },
		cardCVV: function(){ return this.data.cvs; },
		zipCode: function(){ return this.data.zip; },
		cardProvider: function(){ return this.data.card_provider; }
	};

	omni.models.PaymentCredential = PaymentCredential;
	return PaymentCredential;

});