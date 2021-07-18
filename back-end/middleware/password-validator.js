const passwordSchema = require('../models/password');

// middleware to check if the password is strong enough
module.exports = (req, res, next) => {
  let passwordIsOk = passwordSchema.validate(req.body.password);
  if(!passwordIsOk){
    return res.status(400).json({ error : 'Mot de passe trop faible, il doit contenir au moins une minuscule, une majuscule, un chiffre et être d\'une longueur minimum de 8 caractères !'});
  }else {
    next()
  }
};