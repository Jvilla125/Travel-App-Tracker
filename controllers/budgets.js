const Travel = require("../models/travel");
const User = require("../models/user");

module.exports = {
    create,
    delete: deleteBudget,
    update: updateBudget,
    edit: editBudget
}

function create(req, res) {
    Travel.findById(req.params.id, function (err, allTravels) {
        req.body.user = req.user._id;
        allTravels.budgets.push(req.body);
        const budgetArray = allTravels.budgets;
        console.log(budgetArray, "<- Journal array");
        console.log(req.params.id, "<- req.params.id");
        console.log(req.body, "<- req.body.id");

        allTravels.save(function (err) {
            res.redirect(`/travels/${req.params.id}`);
        });
    });
}

function deleteBudget(req, res) {
    Travel.findById(req.params.id, function (err, allTravels) {
        allTravels.budgets.id(req.params.budId).remove()
        allTravels.save(function (err) {
            res.redirect(`/travels/${req.params.id}`);
        });
    });
}

function editBudget(req, res) {
    Travel.findOne({ 'budgets._id': req.params.id }, function (err, travel) {
        const budgetDoc = travel.budgets.id(req.params.id);
        console.log(budgetDoc, "<-- journal Doc")
        res.render(`budgets/edit`, {
            travel: travel,
            budget: budgetDoc
        })
    })
}

async function updateBudget(req, res) {
    try {
        const allTravels = await Travel.findOne({ 'budgets._id': req.params.id });
        const budgetDoc = allTravels.budgets.id(req.params.id);
        budgetDoc.activity = req.body.activity;
        budgetDoc.activityDate = req.body.activityDate;
        budgetDoc.cost = req.body.cost
        allTravels.save();
        res.redirect(`/travels/${allTravels._id}`);
    } catch (err) {
        res.send(err);
    }
}
