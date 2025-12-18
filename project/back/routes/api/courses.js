const express = require('express');
const router = express.Router();
const coursController = require('../../controllers/coursController');
const verifyJWT = require('../../middleware/verifyJWT');

router.use(verifyJWT);

router.get('/', coursController.getAllCourses);
router.get('/enrolled', coursController.getEnrolledCourses);
router.get('/:id', coursController.getCourseById);
router.post('/', coursController.createCourse);
router.put('/:id', coursController.updateCourse);
router.delete('/:id', coursController.deleteCourse);
router.post('/:id/enroll', coursController.enrollCourse);

module.exports = router;
