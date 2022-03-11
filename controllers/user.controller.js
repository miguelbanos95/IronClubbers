const Like = require('../model/like.model')
const Comment = require('../model/comment.model')
const Payment = require("../model/payment.model");
const Party = require('../model/party.model');
const User = require('../model/user.model');

module.exports.favList = (req, res, next) => {
    Like.find({ user: req.user.id })
        .populate('party')
        .then((likes) => {
            res.render("parties/likes", { likes })
        })
        .catch(next)
}

module.exports.doLike = (req, res, next) => {
    const restId = req.params.id
    const userId = req.user.id

    Like.findOneAndDelete({ party: restId, user: userId })
        .then(like => {
            if (like) {
                res.status(200).send({ success: 'Like removed fom DDBB' })
            } else {
                return Like.create({ party: restId, user: userId })
                    .then(() => {
                        res.status(201).send({ success: 'Like added to DDBB' })
                    })
            }
        })
        .catch(next)
}

function calculateRating(comments = []) {
    const commentsWithRating = comments.filter(comment => comment.rate || comment.rate === 0)

    if (commentsWithRating) {
        return (commentsWithRating.reduce((acc, curr) => acc + curr.rate, 0) / commentsWithRating.length).toFixed(2)
    }
    return undefined
}


module.exports.doComment = (req, res, next) => {
    const comment = {
        party: req.params.id,
        user: req.user.id,
        comment: req.body.comment,
        rate: req.body.rate
    }
    Comment.create(comment)
        .then((commentCreated) => {
            return Party.findById(req.params.id)
                .populate('comments')
                .then(party => {
                    const rating = calculateRating(party.comments)

                    if (party.rating !== rating) {
                        party.rating = rating

                        return party.save()
                            .then(() => res.redirect(`/parties/${commentCreated.party}`))
                    } else {
                        res.redirect(`/parties/${commentCreated.party}`)
                    }

                })
        })
        .catch(next)
};

// module.exports.commentEdit = (req, res, next) => {
//     let party  = req.params.id
//     let newComment = req.body.comment
//     let newRating  = req.body.rating
//     let commentId  = req.params.commentId
    
  

//     Comment.findByIdAndUpdate(
//         {"_id": commentId}, 
//         {"$set":{"comment": newComment,"rating": newRating}}, 
//         {runValidators: true})
//         .then((user) => { res.redirect(`/parties/${party}`) })
//         .catch(next)
// }



// module.exports.commentDelete = (req, res, next) => {
//     let party = req.params.id
//     let commentId = req.params.commentId
//     Comment.findByIdAndDelete(commentId)
//         .then((user) => { res.redirect(`/parties/${party}`) })
//         .catch(next)
// }






module.exports.manager = (req, res, next) => {
    console.log("holka",req.user)
    User.findByIdAndUpdate(req.user.id, {manager : true})
    .then(()=>{
        console.log("success", req.user,{new:true})
        res.redirect("/")
    })
    .catch(next)
    
}