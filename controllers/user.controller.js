const Like = require('../model/like.model')

module.exports.profile = (req, res, next) => {
  
    Like.find({ user: req.user.id})
    .populate('party')
    .then((likes) =>{
        res.render("auth/profile", { likes })
    })
    .catch(next) 
}

module.exports.doLike = (req, res, next) => {
    const restId = req.params.id
    const userId = req.user.id

    Like.findOneAndDelete({ party: restId, user: userId })
        .then(like => {
            if(like) {
                res.status(200).send({ success : 'Like removed fom DDBB'})
            } else {
                return Like.create({ party: restId, user: userId})
                    .then(() => {
                        res.status(201).send({ success : 'Like added to DDBB' })
                    })
            }
    })
    .catch(next)
}