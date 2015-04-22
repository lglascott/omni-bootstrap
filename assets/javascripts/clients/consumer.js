define('omni-consumer-client', [
	'omni',
	'omni-salepoint-model',
	'omni-account-model'
], function(
	omni,
    SalePoint,
	Account
) {

	"use strict";

	var MAX_GOOD_STATUS_CODE = 299;
	var SUPPORTED_ZIP_CODES = [94124, 94115, 94117, 94114, 94110, 94103, 94102, 94124, 94109, 94108, 94111, 94133, 94104, 94105, 94107, 94124];

	function Response(data) {
		this.data = data;
	}

	Response.prototype = {

		isError: function () {
			return this.data.statusCode > MAX_GOOD_STATUS_CODE;
		},

		errorMessage: function () {
			var status = this.data.statusMessage;
			var messages = this.data.body.messages;
			return messages && messages.length ? messages[0].text : status;
		},

		bodyContent: function (Model) {
			var content = this.data.body.content;
			if (Model === undefined) return content;
			var map = function (data) {
				return new Model(data);
			};
			if ($.isArray(content)) return $.map(content, map);
			else return map(content);
		}

	};

	function ConsumerClient(host, key) {
		this.host = host;
		this.key = key;
	}

	ConsumerClient.prototype = {

		absUrl: function (path) {
			return this.host + '/api/v1/' + path;
		},

		exec: function (path, options) {
			return $.ajax($.extend({}, {
				method: 'POST',
				url: this.absUrl(path),
				context: this
			}, options || {})).then(function (data) {
				var response = new Response(data);
				return response.isError() ? $.Deferred().fail(response) : response;
			}, function (xhr, error, message) {
				return new Response({
					statusCode: xhr.status,
					statusMessage: message || error,
					body: {
						messages: [{type: "error", text: "Unable to communicate with the API"}],
						content: false
					}
				});
			});
		},

		authLoginFacebook: function (token) {
			return this.exec('auth/login-facebook', {
				token: token
			}).then(function (resp) {
				return resp.bodyContent(Account);
			});
		},

		authSignUp: function (details) {
			return this.exec('auth/signup', details).then(function (resp) {
				return resp.bodyContent(Account);
			});
		},

		authCreateLead: function (details) {
			return this.exec('auth/lead', $.extend(details, {
				key: this.key
			})).then(function (resp) {
				return resp.bodyContent(Account);
			});
		},

		salePointsByAddress: function (address, distance) {
			return this.exec('salepoints/by-address', {
				address: address,
				distance: distance
			}).then(function (resp) {
				return resp.bodyContent(SalePoint);
			});
		},

		zipCodeSupported: function (zipCode) {
			var zip = parseInt(zipCode, 10);
			var supported = SUPPORTED_ZIP_CODES.indexOf(zip) >= 0;
			return $.Deferred().resolve(supported);
		}

	};

	omni.clients.ConsumerClient = ConsumerClient;
	return ConsumerClient;

});