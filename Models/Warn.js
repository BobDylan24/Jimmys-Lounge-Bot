const { model, Schema } = require("mongoose");

let warnSchema = Schema({
    userId: String,
    reason: String,
    Date: String,
    staffId: String,
    number: Number
});

module.exports = model("Warnss", warnSchema);