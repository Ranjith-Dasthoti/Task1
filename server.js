const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const uuid = require("uuid");
const mongoURI = require("./config/keys").mongoURI;
const validateRegisterInput = require("./validation/register");
var MongoClient = require("mongodb").MongoClient;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const users = require("./models/users");
const userRoles = require("./models/user_roles");

//Different roles for an user other than admin
const roles = ["Data writer", "Data Reader", "Guest"];

//connecting to MonogoDb Atlas
mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to MongoDB Server");
  })
  .catch(err => {
    console.log(err);
  });

//----------------------- register an user -----------------------------------

app.post("/register", (req, res) => {
  //for unique id
  const id = uuid();

  //validateRegisterInput function validates the user data according to the restrictions
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    //invalid input, shows the expected input and suggestions
    return res.status(400).json(errors);
  } else {
    //finding whether the user is already exists in the database with the same mail id
    users.findOne({ email: req.body.email }).then(result => {
      if (result) {
        //found an user with the same mail id
        res.status(200).json({ message: "User already exists with the email" });
      } else {
        let newUser = new users(req.body);

        users.find((err, list) => {
          //counting the length of the received list of users
          let len = list.length;
          if (len == 0) {
            //the list is empty, so no user exists in the database
            let role = "Admin";
            let newUserRole = new userRoles({ _id: id, role: role });

            //saving the user to the user_roles collections
            newUserRole
              .save()
              .then(res => {
                console.log(res);
              })
              .catch(err => {
                console.log(err);
              });
          }

          //if the list is not empty, means that there exists users and not empty
          else {
            //picking a random user role from an array roles
            let role = roles[Math.floor(Math.random() * roles.length)];
            let newUserRole = new userRoles({ _id: id, role: role });

            //saving the user to the collections user_roles
            newUserRole
              .save()
              .then(res => {
                console.log(res);
              })
              .catch(err => {
                console.log(err);
              });
          }
        });
        newUser._id = id;

        //saving the new user to the collections users
        newUser
          .save()
          .then(res => {
            console.log(res);
          })
          .catch(err => [console.log(err)]);

        res.status(200).json("User Registered Successfully");
      }
    });
  }
});

//-------------------- connecting two collections and displaying ---------------------------------

//getting all the users and their roles
app.get("/getall", (req, res) => {
  MongoClient.connect(mongoURI, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;

    //test-interview is the database
    var dbo = db.db("test-interview");
    dbo
      .collection("users")
      .aggregate([
        {
          $lookup: {
            from: "user_roles",
            localField: "_id",
            foreignField: "_id",
            as: "userRole"
          }
        }
      ])
      .toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        if (result.length == 0) {
          //there exists no users
          res.status(200).json("No users to display");
        } else {
          //storing full name and role into an array fullDetails
          let fullDetails = result.map(data => {
            let details = {};

            //getting full name by combining firstname and last name
            details.name = data.firstName + " " + data.lastName;
            details.role = data.userRole[0].role;
            return details;
          });
          res.status(200).json(fullDetails);
        }
        db.close();
      });
  });
});

app.listen(4000, () => {
  console.log("server is up and listening");
});
