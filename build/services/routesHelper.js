'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var allowOnly = function allowOnly(accessLevel, callback) {
    function checkUserRole(req, res) {
        var role = req.user.role;

        console.log({ accessLevel: accessLevel });
        console.log({ role: role });
        if (!accessLevel || !role) {
            res.status(403).json({ msg: 'You do not have access to this' });
            return;
        }

        callback(req, res);
    }

    return checkUserRole;
};

exports.allowOnly = allowOnly;
//# sourceMappingURL=routesHelper.js.map