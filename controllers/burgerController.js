var express = require("express");

var router = express.Router();

var db = require("../models");


// Import the model (burger.js) to use its database functions
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.

router.get("/", function(req, res) {
	db.Burger.findAll().then(function(dbBurger) {
		var hbsBurgerObject = {
			burgers: dbBurger
		};
		res.render("index", hbsBurgerObject);
	})
});


router.post("/", function(req, res) {
	db.Burger.create(req.body).then(function(dbBurger) {
		res.redirect("/");
	})
});

router.put("/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

      var updatedVersion = {
      	id: req.params.id,
      	devoured: true
    }


    db.Burger.update(updatedVersion, {
      where: {
        id: req.params.id
      }
    }).then(function(dbBurger) {
      res.redirect("/");
    });

});




// Export routes for server.js to use
module.exports = router;