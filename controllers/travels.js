module.exports = {
    index,
    show,
    new: newTrip
}

function index(req, res){
    res.render("travels/index.ejs");
}

function show(req, res){
    res.render("travels/show.ejs")
}

function newTrip(req, res){
    res.render("travels/new");
}