const mongoose = require("mongoose");
const MongodbConnection = (url) => {
  mongoose
    .connect(url)
    .then(() => console.log("Mongodb Connected!"))
    .catch((err) => {
      console.log("Error: ", err);
    });
};
module.exports=MongodbConnection