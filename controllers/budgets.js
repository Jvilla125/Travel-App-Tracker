const Travel = require("../models/travel");
const User = require("../models/user");

module.exports = {
    create,
    delete: deleteBudget
}

function create(req, res){
    Travel.findById(req.params.id, function(err, allTravels){
        req.body.user = req.user._id;
        allTravels.budgets.push(req.body);
        const budgetArray = allTravels.budgets;
        console.log(budgetArray, "<- Journal array");
        console.log(req.params.id, "<- req.params.id");
        console.log(req.body, "<- req.body.id");

        allTravels.save(function(err){
            res.redirect(`/travels/${req.params.id}`);
        });
    });
}

function deleteBudget(req, res){
    Travel.findById(req.params.id, function(err, allTravels){
        allTravels.budgets.id(req.params.budId).remove()
        allTravels.save(function(err){
            res.redirect(`/travels/${req.params.id}`);
        });
    });
}

// function editJournal(req, res){
//     Travel.findById(req.params.id, function(err, allTravels){

//     })
// }

