const Travel = require("../models/travel");
const User = require("../models/user");

module.exports = {
    create,
    delete: deleteJournal,
    update: updateJournal
}

function create(req, res){
    Travel.findById(req.params.id, function(err, allTravels){
        allTravels.journals.push(req.body);
        const journalArray = allTravels.journals;
        console.log(journalArray, "<- Journal array");
        console.log(req.params.id, "<- req.params.id");
        console.log(req.body, "<- req.body.id");

        allTravels.save(function(err){
            res.redirect(`/travels/${req.params.id}`);
        });
    });
}

function deleteJournal(req, res){
    Travel.findById(req.params.id, function(err, allTravels){
        allTravels.journals.id(req.params.joId).remove()

        allTravels.save(function(err){
            res.redirect(`/travels/${req.params.id}`);
        });
    });
}

function updateJournal(req, res){
    Travel.findOne({'journals._id': req.params.id}, function(err, travel){
        const journalSubdoc = travel.journals.id(req.params.id);
        if(!journalSubdoc.userId.equals(req.user._id)) return res.redirect(`/travels/${travel._id}`);
        journalSubdoc.text = req.body.text;
        travel.save(function(err){
            res.redirect(`/travels/${travel._id}`)
        });
    });
}