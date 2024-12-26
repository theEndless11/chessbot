"use strict";

var mongoose = require('mongoose');

var Message = require('../message'); // Assuming you have the 'message' model
// MongoDB URI should come from your environment variable (ensure you have it set)


var MONGO_URI = process.env.MONGO_URI; // Connect to MongoDB (with retry logic if necessary)

var connectToDatabase = function connectToDatabase() {
  return regeneratorRuntime.async(function connectToDatabase$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!mongoose.connections[0].readyState) {
            _context.next = 2;
            break;
          }

          return _context.abrupt("return", mongoose.connections[0]);

        case 2:
          return _context.abrupt("return", mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
          }));

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
}; // Handle GET requests to fetch messages from the database


module.exports = function _callee(req, res) {
  var messages;
  return regeneratorRuntime.async(function _callee$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (!(req.method === 'GET')) {
            _context2.next = 16;
            break;
          }

          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(connectToDatabase());

        case 4:
          _context2.next = 6;
          return regeneratorRuntime.awrap(Message.find());

        case 6:
          messages = _context2.sent;
          // Fetch all messages
          res.status(200).json(messages); // Send response as JSON

          _context2.next = 14;
          break;

        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](1);
          console.error('Error fetching messages:', _context2.t0);
          res.status(500).json({
            error: 'Failed to fetch messages'
          });

        case 14:
          _context2.next = 17;
          break;

        case 16:
          res.status(405).json({
            error: 'Method not allowed'
          });

        case 17:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 10]]);
};
//# sourceMappingURL=messages.dev.js.map
