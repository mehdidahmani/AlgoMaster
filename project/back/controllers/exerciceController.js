const exerciceModel = require('../model/exerciceModel');
const etudiantModel = require('../model/etudiantModel');

const exerciceController = {
    async getAllExercises(req, res) {
        try {
            const exercises = await exerciceModel.findAll();
            res.json(exercises);
        } catch (err) {
            console.error('Error fetching exercises:', err);
            res.status(500).json({ error: err.message });
        }
    },

    async getExerciseById(req, res) {
        try {
            const { id } = req.params;
            const exercise = await exerciceModel.findById(id);

            if (!exercise) {
                return res.status(404).json({ error: 'Exercise not found' });
            }

            res.json(exercise);
        } catch (err) {
            console.error('Error fetching exercise:', err);
            res.status(500).json({ error: err.message });
        }
    },

    async createExercise(req, res) {
        try {
            const { contenu, difficulte, type } = req.body;
            const userId = req.userId;
            const role = req.role;

            if (!contenu || !difficulte || !type) {
                return res.status(400).json({ error: 'Content, difficulty, and type are required' });
            }

            if (role !== 'enseignant' && role !== 'admin') {
                return res.status(403).json({ error: 'Only teachers and admins can create exercises' });
            }

            const newExercise = await exerciceModel.create({
                contenu,
                difficulte,
                type,
                idEnseignant: userId
            });

            res.status(201).json(newExercise);
        } catch (err) {
            console.error('Error creating exercise:', err);
            res.status(500).json({ error: err.message });
        }
    },

    async updateExercise(req, res) {
        try {
            const { id } = req.params;
            const { contenu, difficulte, type } = req.body;
            const userId = req.userId;
            const role = req.role;

            const exercise = await exerciceModel.findById(id);
            if (!exercise) {
                return res.status(404).json({ error: 'Exercise not found' });
            }

            if (role !== 'admin' && exercise.idEnseignant !== userId) {
                return res.status(403).json({ error: 'You can only update your own exercises' });
            }

            const updatedExercise = await exerciceModel.update(id, { contenu, difficulte, type });
            res.json(updatedExercise);
        } catch (err) {
            console.error('Error updating exercise:', err);
            res.status(500).json({ error: err.message });
        }
    },

    async deleteExercise(req, res) {
        try {
            const { id } = req.params;
            const userId = req.userId;
            const role = req.role;

            const exercise = await exerciceModel.findById(id);
            if (!exercise) {
                return res.status(404).json({ error: 'Exercise not found' });
            }

            if (role !== 'admin' && exercise.idEnseignant !== userId) {
                return res.status(403).json({ error: 'You can only delete your own exercises' });
            }

            await exerciceModel.delete(id);
            res.json({ message: 'Exercise deleted successfully' });
        } catch (err) {
            console.error('Error deleting exercise:', err);
            res.status(500).json({ error: err.message });
        }
    },

    async enrollExercise(req, res) {
        try {
            const { id } = req.params;
            const userId = req.userId;
            const role = req.role;

            if (role !== 'etudiant') {
                return res.status(403).json({ error: 'Only students can enroll in exercises' });
            }

            const exercise = await exerciceModel.findById(id);
            if (!exercise) {
                return res.status(404).json({ error: 'Exercise not found' });
            }

            const student = await etudiantModel.findById(userId);
            if (!student) {
                return res.status(400).json({ error: 'Student profile not found' });
            }

            const isAlreadyEnrolled = await exerciceModel.isEnrolled(userId, id);
            if (isAlreadyEnrolled) {
                return res.status(400).json({ error: 'Already enrolled in this exercise' });
            }

            await exerciceModel.enrollStudent(userId, id);
            res.status(201).json({ message: 'Successfully enrolled in exercise' });
        } catch (err) {
            console.error('Error enrolling in exercise:', err);
            res.status(500).json({ error: err.message });
        }
    },

    async getEnrolledExercises(req, res) {
        try {
            const userId = req.userId;
            const exercises = await exerciceModel.getEnrolledExercises(userId);
            res.json(exercises);
        } catch (err) {
            console.error('Error fetching enrolled exercises:', err);
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = exerciceController;
