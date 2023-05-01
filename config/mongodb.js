const mongoose = require("mongoose")

mongoose.connect('mongodb://0.0.0.0:27017')
.then(()=>{console.log("Connected")})
.catch((error=>console.log("connection to mongo error", error)))

mongoosePaginate.paginate.options={
    limit:5
}

module.exports = mongoose
