'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateNotificationList = exports.asyncGetData = undefined;

// async get data
var asyncGetData = exports.asyncGetData = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var society_id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var entity_type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    var finalList, i, current, endResult;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            finalList = [];


            for (i = 0; i < list.length; i++) {
              current = list[i];

              if (entity_type.toString() === '4' || entity_type.toString() === '5' || entity_type.toString() === '6') {
                finalList.push((0, _contribution.queryPaymentRequisitionAsync)({
                  query_type: 'by_status_req',
                  req_id: current.entity_id,
                  society_id: society_id
                }));
              } else if (entity_type.toString() === '7') {
                finalList.push((0, _contribution.queryContributionAsync)({
                  query_type: 'summary_by_reference',
                  society_id: society_id,
                  reference: current.entity_id
                }));
              } else if (entity_type.toString() === '8' || entity_type.toString() === '9' || entity_type.toString() === '10' || entity_type.toString() === '11') {
                finalList.push((0, _loan.queryLoanApplicationAsync)({
                  query_type: 'by_id',
                  society_id: society_id,
                  loan_id: current.entity_id
                }));
              } else if (entity_type.toString() === '12' || entity_type.toString() === '13' || entity_type.toString() === '14') {
                finalList.push((0, _loan.queryLoanApplicationAsync)({
                  query_type: 'by_id',
                  society_id: society_id,
                  loan_id: current.entity_id
                }));
              }
            }

            _context.next = 4;
            return Promise.all(finalList);

          case 4:
            endResult = _context.sent;
            return _context.abrupt('return', endResult);

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function asyncGetData() {
    return _ref.apply(this, arguments);
  };
}();

// generate a list of notification messages from a dataset


var generateNotificationList = exports.generateNotificationList = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var society_id = arguments[1];

    var formattedResp, generalList, j, current, finalResult, flatList, _loop, k;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // console.log('First Resp', resp)
            formattedResp = {};

            list.forEach(function (i) {
              var keysFound = Object.keys(formattedResp);
              // console.log('checking', i.entity_type)
              // console.log(
              //   'checking: resp',
              //   keysFound,
              //   'Looking for ',
              //   i.entity_type,
              //   keysFound.includes(i.entity_type.toString()),
              // )

              if (keysFound.includes(i.entity_type.toString())) {
                formattedResp[i.entity_type] = formattedResp[i.entity_type].concat(i);
              } else {
                formattedResp[i.entity_type] = [i];
              }
            });

            // console.log('Formatted', formattedResp)

            generalList = [];


            for (j = 0; j < Object.keys(formattedResp).length; j++) {
              current = Object.keys(formattedResp)[j];
              // let item = await asyncGetData(formattedResp[current])
              // generalList.push(item)

              generalList.push(asyncGetData(formattedResp[current], society_id, current));
              // console.log('Adding promises', current, j)
            }

            _context2.next = 6;
            return Promise.all(generalList);

          case 6:
            finalResult = _context2.sent;

            console.log('All promises now resolved');
            // console.log('General List Completed', finalResult)

            flatList = [];
            // [ k[ j[ l[TextRow] ] ], [ [ [TextRow] ] ] ]

            _loop = function _loop(k) {
              var current1 = finalResult[k];
              // console.log(current1)
              for (var _j = 0; _j < current1.length; _j++) {
                var current2 = current1[_j];
                var current_entity = Object.keys(formattedResp).find(function (a, x) {
                  return x === k;
                });
                // console.log(current_entity, 'current_entity')
                var notifObj = formattedResp[current_entity][_j];
                // console.log(notifObj)
                for (var l = 0; l < current2.length; l++) {
                  var current3 = current2[l];
                  // console.log(current3)
                  notifObj.message = buildNotificationMessage(current_entity, current3);
                  notifObj.data = current3;
                  // flatList.push({ data: current3, notifObj })
                  flatList.push(notifObj);
                }
              }
            };

            for (k = 0; k < finalResult.length; k++) {
              _loop(k);
            }

            return _context2.abrupt('return', flatList);

          case 12:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function generateNotificationList() {
    return _ref2.apply(this, arguments);
  };
}();

exports.buildNotificationMessage = buildNotificationMessage;
exports.getMemberRequest = getMemberRequest;
exports.sendNotification = sendNotification;

var _i18n = require('i18n');

var _i18n2 = _interopRequireDefault(_i18n);

var _contribution = require('../queries/contribution');

var _loan = require('../queries/loan');

var _entity_details = require('./entity_details');

var _entity_details2 = _interopRequireDefault(_entity_details);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _users = require('../queries/users');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var onesignal_url = 'https://onesignal.com/api/v1/notifications';

// Ishq Ibrahim wants to join Alajeseku Cooperatives
// {{actor_username}} {{action_type}} {{entity_description}}
function buildNotificationMessage(entity_type, data) {
  var processed_data = _entity_details2.default[entity_type].pre_process ? _entity_details2.default[entity_type].pre_process(data) : data;
  //   console.log(processed_data)
  //   let message = i18n.__(
  //     '{{actor_username}} {{action_type}} {{entity_description}}',
  //     processed_data,
  //   )
  var message = _i18n2.default.__(_entity_details2.default[entity_type].message_prop, processed_data);
  return message;
}

function getMemberRequest() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return {
    actor_username: data.firstname + ' ' + data.lastname,
    action_type: data.action_type,
    entity_description: data.entity_description
  };
}function sendNotification() {
  var userId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var notification = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  (0, _users.usersApi)({
    id: userId,
    query_type: 'info'
  }, function (data) {
    var userObj = data[0];
    var App_id = process.env.ONESIGNA_APP_ID;
    var Api_key = process.env.ONESIGNAL_API_KEY;

    var options = {
      method: 'POST',
      body: JSON.stringify({
        app_id: App_id,
        contents: { en: notification },
        include_player_ids: [userObj.deviceId], //userObj.deviceId
        data: { source: 'message' }
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + Api_key
      }
    };

    (0, _request2.default)(options, function (err, response, body) {
      if (!err) {
        console.log('Push notification sent');
        console.log('RESPONSE', response, body);
      } else {
        console.log('Error sending push notification');
        console.log('ERROR', err);
      }
    });
  });
}
//# sourceMappingURL=notification.js.map