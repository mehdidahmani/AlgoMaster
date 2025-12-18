const express = require('express');
const router = express.Router();
const exerciceController = require('../../controllers/exerciceController');
const verifyJWT = require('../../middleware/verifyJWT');

router.use(verifyJWT);

router.get('/', exerciceController.getAllExercises);
router.get('/enrolled', exerciceController.getEnrolledExercises);
router.get('/:id', exerciceController.getExerciseById);
router.post('/', exerciceController.createExercise);
router.put('/:id', exerciceController.updateExercise);
router.delete('/:id', exerciceController.deleteExercise);
router.post('/:id/enroll', exerciceController.enrollExercise);

module.exports = router;
