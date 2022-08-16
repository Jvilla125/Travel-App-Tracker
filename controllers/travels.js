const User = require("../models/user");
const Travel = require("../models/travel")

module.exports = {
    index,
    show,
    new: newTravel,
    create,
    delete: deleteTravel,
    edit: editTravel,
    update: updateTravel
}

function index(req, res){
    Travel.find({}, function(err, travelDocs){
        console.log(travelDocs, "<- travel docs")
        if(err){
            res.send("You have an error");
        }
        res.render("travels/index.ejs", {
            travels: travelDocs
        });
    });
    
}

// async function show(req, res){
//   try{
//     const travelDocument = await Travel.findById(req.params.id)
//     console.log(travelDocument, "<- travel document")
//     res.render("travels/show.ejs",{
//         travels: travelDocument
//     });
//   } catch(err){
//     res.send(err);
//   }
// }

function show(req, res){
    Travel.findById(req.params.id, function (err, travelDocs){
        console.log(travelDocs, "<-- all travels")
        res.render("travels/show.ejs", {
            travel: travelDocs
        })
    });
}

function newTravel(req, res){
    res.render("travels/new");
}

function create(req, res){
    req.body.user = req.user._id
    console.log(req.body);
    Travel.create(req.body, function(err, travelDocs){
        if (err) {
            console.log(err, "error in create controller")
            return res.render("travels/new.ejs");
        }
        console.log(travelDocs, "<-- travel created in db");
        res.redirect(`/travels/${travelDocs._id}`);
    });
}

function deleteTravel(req, res){
    Travel.findByIdAndRemove(req.params.id, function(err){

            res.redirect("/travels")
        });
    }
    
function editTravel(req, res){
    Travel.findById(req.params.id, function(err, allTravels){
        // if (!allTravels.user.equals(req.user._id)) return res.redirect('/travels');
        res.render(`travels/edit`, {
            travel: allTravels
        });
    });
}

async function updateTravel(req, res){
    try{
    const allTravels = await Travel.findByIdAndUpdate(req.params.id)
    allTravels.continent = req.body.continent;
    allTravels.country = req.body.country;
    allTravels.city = req.body.city;
    allTravels.description = req.body.description;
    allTravels.dateArrived = req.body.dateArrived;
    allTravels.dateDeparted = req.body.dateDeparted;
    allTravels.save();
    res.redirect(`${allTravels._id}`);
    } catch(err){
        res.send(err)
    }
}