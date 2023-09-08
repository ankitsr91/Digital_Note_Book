const mongoose = require("mongoose");
const uri = "mongodb://localhost:27017/digital_Note_Book";
const connectToMongo = () => {
  mongoose
    .connect(uri)
    .then(() => console.log("Successfully connected to Mongo"))
    .catch((err) => {
      console.error(err);
    });
};

// const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));

module.exports = connectToMongo;
