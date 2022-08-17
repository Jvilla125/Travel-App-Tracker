const Travel = require("../models/travel");
const User = require("../models/user");

module.exports = {
    create,
    delete: deleteBudget,
    update: updateBudget,
    edit: editBudget
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

function editBudget(req, res){
    Travel.findOne({'budgets._id': req.params.id}, function(err, travel){
        const budgetDoc = travel.budgets.id(req.params.id);
        console.log(budgetDoc, "<-- journal Doc")
        res.render(`budgets/edit`,{
        travel: travel,
        budget: budgetDoc
        })
    })
}

function updateBudget(req, res){
    Travel.findById(req.params.id, function (err, allTravels){
        for(let i = 0; i<allTravels.budgets; i++){
            if(allTravels.budgets[i]._ == req.params.id){
                allTravels.budgets[i].activity = req.body.activity;
                allTravels.budgets[i].activityDate = req.body.activityDate;
                allTravels.budgets[i].cost = req.body.ocst;
                allTravels.save(function (err){
                    res.redirect(`/travels/${res.params._id}`)
                })
            }
        }
    })
}
