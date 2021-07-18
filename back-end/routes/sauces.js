const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth'); // Authentification middleware added to the routes
const multer = require('../middleware/multer-config'); // multer middleware added to the routes that deal with images 

const sauceCtrl = require('../controllers/sauces');

router.get('/', auth, sauceCtrl.getAllSauces);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.post('/', auth, multer, sauceCtrl.createSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.post('/:id/like', auth, sauceCtrl.sauceLiked);


module.exports = router;