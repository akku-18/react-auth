const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/myLoginRegisterDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch((e) => console.log(e));

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = new mongoose.model("User", userSchema);

// Routes
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email: email}).then((user) => {
        if (user) {
            if (password === user.password){
                res.send({ message: "Login successful", user: user})
            } else {
                res.send({ message: "Password incorrect"})
            }
        } else {
            res.send({message: "User not registered"});
        }
    })
});

app.post("/register", (req, res) => {
  // res.send("My api register");
  const { name, email, password } = req.body;

  User.findOne({ email: email }).then((user) => {
    if (user) {
        res.send({ message: "Already registered" })
    } else {

      const user = new User({ name: name, email: email, password: password });
      user
        .save()
        .then(() =>  res.send({ message: "Registration successful! Please login now" }))
        .catch((e) => res.send(e));
    }
  });
});

PORT = 9002;

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

