define('omni-consumer-client', [
	'omni',
	'omni-salepoint-model',
	'omni-account-model',
	'omni-timeslot-model'
], function(
	omni,
	SalePoint,
	Account,
	TimeSlot
) {

	"use strict";

	var SUPPORTED_ZIP_CODES = [94124, 94115, 94117, 94114, 94110, 94103, 94102, 94124, 94109, 94108, 94111, 94133, 94104, 94105, 94107, 94124];

	function Response(data) {
		this.data = data;
	}

	Response.prototype = {

		isError: function () {
			return this.statusCode() !== ConsumerClient.statusCodes.OK;
		},

		statusCode: function () {
			return this.data.statusCode;
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

	ConsumerClient.statusCodes = {
		OK: 200,
		ALREADY_LOGGED_IN: 1016
	};

	ConsumerClient.prototype = {

		statusCodes: ConsumerClient.statusCodes,

		constants: {
			CUSTOM_BUILDING_NAME: 'My Residence'
		},

		absUrl: function (path) {
			return this.host + '/api/v1/' + path;
		},

		exec: function (path, data, options) {
			return $.ajax($.extend({}, {
				method: 'POST',
				url: this.absUrl(path),
				context: this,
				data: data,
				xhrFields: {
					withCredentials: true
				}
			}, options || {})).then(function (data) {
				var response = new Response(data);
				return response.isError() ? $.Deferred().reject(response) : response;
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

		updateProfile: function(details) {
			return this.exec('profile', details).then(function (resp) {
				return resp.bodyContent(Account);
			});
		},

		loginWithFacebookToken: function (token) {
			return this.exec('auth/login-facebook', {
				token: token
			}).then(function (resp) {
				return resp.bodyContent(Account);
			});
		},

		login: function (details) {
			return this.exec('auth/login', details).then(function (resp) {
				return resp.bodyContent(Account);
			});
		},

		logout: function () {
			return this.exec('auth/logout', null, { method: 'GET' });
		},

		signup: function (details) {
			return this.exec('auth/signup', details).then(function (resp) {
				return resp.bodyContent(Account);
			});
		},

		createLead: function (details) {
			return this.exec('auth/lead', $.extend(details, {
				key: this.key,
				building_name: this.constants.CUSTOM_BUILDING_NAME
			})).then(function (resp) {
				return resp.bodyContent(Account);
			});
		},

		pickupTimesScheduled: function () {
			return this.exec('scheduler/available-dates', null, { method: 'GET' }).then(function (resp) {
				return $.map(resp.bodyContent(), function(str){
					return new Date(str).getTime();
				});
			});
		},

		updatePaymentCredentials: function(details){
			return this.exec('payments/credentials', details);
		},

		pickupTimeSlots: function (opts) {
			var weeks = [], now = new Date();
			opts = $.extend({
				startDate: now,
				hourDelta: 2,
				startHour: 8,
				endHour: 18,
				weeks: 1
			}, opts || {});
			return this.pickupTimesScheduled().then(function(scheduled){
				for (var iweek = 0; iweek <= opts.weeks; iweek++) {
					var week = [];
					for (var iday = 0; iday < 7; iday++) {
						var day = [];
						for (var ihour = opts.startHour; ihour <= opts.endHour; ihour += opts.hourDelta) {
							var ts, avail, end, start = new Date();
							start.setHours(ihour);
							start.setMinutes(0);
							ts = start.setDate(start.getDate() + iweek * 7 + iday);
							end = new Date(ts);
							end.setHours(end.getHours() + opts.hourDelta);
							avail = start > now && scheduled.indexOf(ts) < 0;
							day.push(new TimeSlot({
								start: start.getTime(),
								end: end.getTime(),
								available: avail
							}));
						}
						week.push(day);
					}
					weeks.push(week);
				}
				return weeks;
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