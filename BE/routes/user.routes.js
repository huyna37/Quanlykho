const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');

router.get('/:pageIndex/:pageSize', controller.getAll);
router.post('', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;