const Travel = require("../models/travel");
const User = require("../models/user");

module.exports = {
    create,
    delete: deleteJournal,
    update: updateJournal,
    edit: editJournal
}

function create(req, res){
    Travel.findById(req.params.id, function(err, allTravels){
        req.body.user = req.user._id;
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

function editJournal(req, res){
    Travel.findOne({'journals._id': req.params.id}, function(err, travel){
        const journalDoc = travel.journals.id(req.params.id);
        res.render(`journals/edit`,{
        travel: travel,
        journal: journalDoc
        })
    })
}
// function updateJournal(req, res) {
//     Travel.findOne({'journals._id': req.params.id}, function(err, travel) {
//       const journalSubdoc = travel.journals.id(req.params.id);
//       console.log(journalSubdoc, "<--- journal subdoc")
//     //   if (!journalSubdoc.userId.equals(req.user._id)) return res.redirect(`/travels/${travel._id}`);
//       journalSubdoc.text = req.body.text;
//       journalSubdoc.itemNo  = req.body.itemNo;
//       travel.save(function(err) {
//         res.redirect(`/travels/${travel._id}`);
//       });
//     });
// }
// function updateJournal(req, res){
//     Travel.findOne({'journals._id': req.params.id}, function(err, travel){
//         const journalSubdoc = travel.journals.id(req.params.id);
//         if(!journalSubdoc.userId.equals(req.user._id)) return res.redirect(`/travels/${travel._id}`);
//         journalSubdoc.text = req.body.text;
//         journalSubdoc.itemNo = req.body.itemNo;
//         journalSubdoc.save();
//         travel.save(function(err){
//             res.redirect(`/travels/${travel._id}`)
//         });
//     });
// }

async function updateJournal(req, res){
    try{
        const allTravels = await Travel.findOne({'journals._id': req.params.id});
        console.log(req.params.id, "<- req.params.id")
        const journalSubdoc = allTravels.journals.id(req.params.id);
        console.log(req.params.id, "<- journal req.params.id")
        journalSubdoc.text = req.body.text;
        journalSubdoc.itemNo = req.body.itemNo;
        allTravels.save();
        res.redirect(`/travels/${allTravels._id}`);
    } catch(err){
        res.send(err);
    }
}

// function updateJournal(req, res){
//     console.log("an update function")
//     Travel.findById(req.params.id, function(err, allTravels){
//         allTravels.journals.itemNo = req.body.itemNo;
//         allTravels.journals.text = req.body.text;
//         allTravels.save(function(err){
//             res.redirect(`/travels/${req.params._id}`)
//         })
        
//     })
// }
// for(let i = 0; i <allTravels.journals; i++){
//     if (allTravels.journals[i]._id == req.params.id){
//         allTravels.journals[i].text = req.body.text;
//         allTravels.journals[i].itemNo = req.body.itemNo;
//         allTravels.save(function (err){
//             res.redirect(`/travels/${req.params._id}`)
//         });
//     }
// }

