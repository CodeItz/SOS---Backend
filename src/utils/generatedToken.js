const crypto = require("crypto");

module.exports = function () {
    const token = crypto.randomBytes(20).toString('hex');

    const now = new Date();
    now.setHours(now.getHours() + 1);


    return { token, now };
}