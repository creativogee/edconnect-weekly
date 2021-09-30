const { Router } = require('express');
const router = Router();

const { dashboard } = require('../controllers/home');

router.route('/').get(dashboard);

module.exports = router;
