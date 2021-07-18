const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


// signup function
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          email: req.body.email,
          emailMasked: req.body.email,
          password: hash
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => {
            res.status(400).json({ error : "Adresse e-mail déjà utilisée."});
          })
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ error })
      });
};

// Login function
exports.login = (req, res, next) => {
  User.findOne({ email : req.body.email })
    .then(user => {
      if (!user) { // if the email addresse is not found return an error
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) { // if PW doesn't match with the email adress return an error
            return res.status(401).json({ error: "Mot de passe incorrect !"});
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
                { userId: user._id},
                'UOFJUOdJOUtq8M0askG8JdnmRf4fSIFBuVMeVqdqxTnEV7A5nPC0gfYbLatKN7V',
                { expiresIn: '24h'}
            ) 
          });
        })
        .catch(error => {
          console.log(error);
          res.status(500).json({ error })
        });
    })
    .catch(error => {
      res.status(500).json({ error })
    });
};