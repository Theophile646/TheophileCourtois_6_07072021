const Sauce = require('../models/sauce');
const fs = require('fs'); // Package to delete image from folder


// Create sauce
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  sauce.save()
    .then(() => res.status(201).json({ message: 'Sauce enregistrée !'}))
    .catch(error => {
      console.log(error);
      res.status(400).json({ error })
    });
};


// get sauce with id
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(
      (sauce) => { res.status(200).json(sauce) }
    )
    .catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
  };


//modify sauce from id
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
    .catch(error => {
      //console.log(error);
      res.status(400).json({ error })
    });
};


//delete sauce from id
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};


//return table of all sauces
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
  .then(
    (sauces) => {
      res.status(200).json(sauces);
    })
  .catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};


//define like status
exports.sauceLiked = (req, res, next) => {
  let userId = req.body.userId;
  let like = req.body.like;
  let sauceId = req.params.id;

  Sauce.findOne({ _id: sauceId })
    .then(sauce => {
      switch (like) {
        case 1: 
          if (!sauce.usersLiked.includes(userId)) {
            Sauce.updateOne(
              { _id: sauceId },
              { $push: { usersLiked: userId }, $inc: { likes: 1 }}
            )  
            .then(
              () => {
                res.status(200).json({ message: 'Vous aimez cette sauce!' });
              })
            .catch(
              (error) => {
                console.log(error);
                res.status(400).json({ error });
              }) 
            } else {
              break;
            }     

        case 0:
          if (sauce.usersLiked.includes(userId)){
            Sauce.updateOne(
              { _id: sauceId },
              { $pull: { usersLiked: { $in: [ userId ] }}, $inc: { likes: -1 }}
            )
            .then(
              () => {
                res.status(200).json({ message: "Vous n'aimez plus cette sauce!" });
            })
            .catch(
              (error) => {
                res.status(400).json({ error: error });
              })     
          } else{
            Sauce.updateOne(
              { _id: sauceId },
              { $pull: { usersDisliked: { $in: [ userId ] }}, $inc: { dislikes: -1 }}
            )
            .then(
              () => {
                res.status(200).json({
                  message: "Cette sauce n'est plus notée!"
                });
            })
            .catch(
              (error) => {
                res.status(400).json({
                  error: error
                });
              })
          }
          break;

        case -1:
          if (!sauce.usersLiked.includes(userId)) {
            Sauce.updateOne(
              { _id : sauceId },
              { $push: { usersDisliked: userId }, $inc: { dislikes: 1 }}
            )
            .then(
              () => {
                res.status(200).json({ message: "Vous n'aimez pas cette sauce!" });
            })
            .catch(
              (error) => {
                console.log(error);
                res.status(400).json({ error });
              })    
          } else {
            break;
          }  

        default:
          break;
      }
    })
}      