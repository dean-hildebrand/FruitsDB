const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  // we're connected!
});

// Initializes the schema
const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Your fruit needs a name!"]
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});

// Model "Fruit" as a string, adhering to the fruit schema
const Fruit = mongoose.model("Fruit", fruitSchema);

// new fruit to be created and added to db
const fruit = new Fruit({
  name: "Kiwi",
  rating: 7,
  review: "Delicious and green"
});
// fruit.save();

const personSchema = new mongoose.Schema({
  name: String,
  age: Number
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name: "John",
  age: 37
});
// person.save()

// Finding/Reading a fruit in db
Fruit.find(function(err, fruits) {
  if (err) {
    console.log(err);
  } else
  mongoose.connection.close()

    fruits.forEach(fruit => {
      console.log(fruit.name);
    });
});

// update Fruit
// Fruit.updateOne({_id: "5f1f3997ae44162082bf5654"}, {name: "Peach", rating: 10, review: "Peaches are amazing!!!"}, function(err){
//   if(err){
//     console.log(err);
//   } else {
//     console.log("Logged successfully");
//   }
// })

Fruit.deleteMany({name: "Apple"}, function(err){
  if (err) {
    console.log(err);
  } else {
    console.log("Deleted successfully");
  }
})
