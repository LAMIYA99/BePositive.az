const mongoose = require("mongoose");
require("./models/Blog");
require("./models/Faq");
require("./models/Review");
require("./models/Service");
require("./models/Training");

console.log("Registered Models:", Object.keys(mongoose.models));
