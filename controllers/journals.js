const Travel = require("../models/travel");
const User = require("../models/user");

module.exports = {
    create
}

function create(req, res){
    
    console.log(req.user, "<-- google profile");
    console.log(req.params.id, "<params ")

        travel.create(req.body, function(err, travel){
            res.redirect(`/travels/${profile}`);
        })
    }