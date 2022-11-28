const router = require('express').Router();

const {carController} = require('../controller');

router.get('/', carController.getAll);
router.post('/', carController.create);

module.exports = router;