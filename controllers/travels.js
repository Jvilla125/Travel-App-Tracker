const User = require("../models/user");
const Travel = require("../models/travel")

module.exports = {
    index,
    show,
    new: newTravel,
    create
}

function index(req, res){
    Travel.find({}, function(err, travelDocs){
        if(err){
            res.send("You have an error");
        }
        res.render("travels/index.ejs", {
            travels: travelDocs
        });
    });
    
}

async function show(req, res){
  try{
    const travelDocument = await Travel.findById(req.params.id)
    res.render("travels/show.ejs",{
        travels: travelDocument
    });
  } catch(err){
    res.send(err);
  }
}

function newTravel(req, res){
    res.render("travels/new");
}

function create(req, res){
    console.log(req.body);
    Travel.create(req.body, function(err, travelDocs){
        if (err) {
            console.log(err, "error in create controller")
            return res.rend("travels/new.ejs");
        }
        console.log(travelDocs, "<-- travel created in db");
        res.redirect(`/travels/${travelDocs._id}`);
    });
}