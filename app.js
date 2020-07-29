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
const kiwi = new Fruit({
  name: "Kiwi",
  rating: 7,
  review: "Delicious and green"
});
// kiwi.save();

const pineapple = new Fruit({
  name: "Pineapple",
  rating: 9,
  review: "Great fruit."
})
// pineapple.save()

const peach = new Fruit({
  name: "Peach",
  rating: 10,
  review: "Yummy and sweet."
})
// peach.save()

const guava = new Fruit({
  name: "Guava",
  rating: 8,
  review: "Tropical and mouth watering in fruit salad!"
})
// guava.save()

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  // adds a relationship of favorite fruit to a Person
  favoriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);


const amy = new Person({
  name: "Amy",
  age: 12,
  favoriteFruit: pineapple
});
// amy.save()

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

// update Person
// Person.updateOne({name: "John"}, {favoriteFruit: guava}, function(err){
//   if(err){
//     console.log(err);
//   } else {
//     console.log("Logged successfully");
//   }
// })
// //
// Person.deleteMany({name: "Amy"}, function(err){
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Deleted successfully");
//   }
// })
