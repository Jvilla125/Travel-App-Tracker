const Travel = require("../models/travel");
const User = require("../models/user");

module.exports = {
    create,
    delete: deleteJournal,
    update: updateJournal,
    edit: editJournal
}

function create(req, res) {
    Travel.findById(req.params.id, function (err, allTravels) {
        req.body.user = req.user._id;
        allTravels.journals.push(req.body);
        const journalArray = allTravels.journals;
        allTravels.save(function (err) {
            res.redirect(`/travels/${req.params.id}`);
        });
    });
}

function deleteJournal(req, res) {
    Travel.findById(req.params.id, function (err, allTravels) {
        allTravels.journals.id(req.params.joId).remove()
        allTravels.save(function (err) {
            res.redirect(`/travels/${req.params.id}`);
        });
    });
}

function editJournal(req, res) {
    Travel.findOne({ 'journals._id': req.params.id }, function (err, travel) {
        const journalDoc = travel.journals.id(req.params.id);
        res.render(`journals/edit`, {
            travel: travel,
            journal: journalDoc
        })
    })
}

async function updateJournal(req, res) {
    try {
        const allTravels = await Travel.findOne({ 'journals._id': req.params.id });
        const journalSubdoc = allTravels.journals.id(req.params.id);

        journalSubdoc.text = req.body.text;
        journalSubdoc.itemNo = req.body.itemNo;
        allTravels.save();
        res.redirect(`/travels/${allTravels._id}`);
    } catch (err) {
        res.send(err);
    }
}
