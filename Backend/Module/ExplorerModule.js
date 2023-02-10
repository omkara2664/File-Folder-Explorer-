const mongoose = require("mongoose");
const explorerSchema = mongoose.Schema({
    name: { type: String, require: true },
    items: { type: Array, require: true },
    isFolder: { type: Boolean, require: true },
    createdAt: { type: Date, default: new Date() },
    modifiedAt: { type: Date, default: new Date() }
},
    { timestamps: true }
)

module.exports = mongoose.model("Explorer", explorerSchema);