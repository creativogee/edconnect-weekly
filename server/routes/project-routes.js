const { Router } = require('express');
const router = Router();

const { projectGet, projectSubmitGet, projectSubmitPost } = require('../controllers/project');

//project submit routes
router.route('/projects/submit').get(projectSubmitGet).post(projectSubmitPost);

//project get route
router.route('/project/:id').get(projectGet);

module.exports = router;
