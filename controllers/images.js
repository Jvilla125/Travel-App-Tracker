const Travel = require("../models/travel");
const User = require("../models/user");

module.exports = {
    create,
    delete: deleteImage,
}

function create(req, res) {
    Travel.findById(req.params.id, function (err, allTravels) {
        req.body.user = req.user._id;
        allTravels.images.push(req.body);
        allTravels.save(function (err) {
            res.redirect(`/travels/${req.params.id}`);
        });
    });
}

function deleteImage(req, res) {
    Travel.findById(req.params.id, function (err, allTravels) {
        allTravels.images.id(req.params.imgId).remove()

        allTravels.save(function (err) {
            res.redirect(`/travels/${req.params.id}`);
        });
    });
}