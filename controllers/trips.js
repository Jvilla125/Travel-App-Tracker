const Profile = require("../models/profile");

module.exports = {
    create
}

function create(req, res){
    console.log(req.user, "what is this")
}