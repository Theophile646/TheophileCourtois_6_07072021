const jwt = require('jsonwebtoken');


// Middleware to make sure that the user has a valid token when he is performing actions on the website
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'UOFJUOdJOUtq8M0askG8JdnmRf4fSIFBuVMeVqdqxTnEV7A5nPC0gfYbLatKN7V');
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};