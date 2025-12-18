const coursModel = require('../model/coursModel');
const etudiantModel = require('../model/etudiantModel');

const coursController = {
    async getAllCourses(req, res) {
        try {
            const courses = await coursModel.findAll();
            res.json(courses);
        } catch (err) {
            console.error('Error fetching courses:', err);
            res.status(500).json({ error: err.message });
        }
    },

    async getCourseById(req, res) {
        try {
            const { id } = req.params;
            const course = await coursModel.findById(id);

            if (!course) {
                return res.status(404).json({ error: 'Course not found' });
            }

            res.json(course);
        } catch (err) {
            console.error('Error fetching course:', err);
            res.status(500).json({ error: err.message });
        }
    },

    async createCourse(req, res) {
        try {
            const { nom, module } = req.body;
            const userId = req.userId;
            const role = req.role;

            if (!nom || !module) {
                return res.status(400).json({ error: 'Name and module are required' });
            }

            if (role !== 'enseignant' && role !== 'admin') {
                return res.status(403).json({ error: 'Only teachers and admins can create courses' });
            }

            const newCourse = await coursModel.create({
                nom,
                module,
                idEnseignant: userId
            });

            res.status(201).json(newCourse);
        } catch (err) {
            console.error('Error creating course:', err);
            res.status(500).json({ error: err.message });
        }
    },

    async updateCourse(req, res) {
        try {
            const { id } = req.params;
            const { nom, module } = req.body;
            const userId = req.userId;
            const role = req.role;

            const course = await coursModel.findById(id);
            if (!course) {
                return res.status(404).json({ error: 'Course not found' });
            }

            if (role !== 'admin' && course.idEnseignant !== userId) {
                return res.status(403).json({ error: 'You can only update your own courses' });
            }

            const updatedCourse = await coursModel.update(id, { nom, module });
            res.json(updatedCourse);
        } catch (err) {
            console.error('Error updating course:', err);
            res.status(500).json({ error: err.message });
        }
    },

    async deleteCourse(req, res) {
        try {
            const { id } = req.params;
            const userId = req.userId;
            const role = req.role;

            const course = await coursModel.findById(id);
            if (!course) {
                return res.status(404).json({ error: 'Course not found' });
            }

            if (role !== 'admin' && course.idEnseignant !== userId) {
                return res.status(403).json({ error: 'You can only delete your own courses' });
            }

            await coursModel.delete(id);
            res.json({ message: 'Course deleted successfully' });
        } catch (err) {
            console.error('Error deleting course:', err);
            res.status(500).json({ error: err.message });
        }
    },

    async enrollCourse(req, res) {
        try {
            const { id } = req.params;
            const userId = req.userId;
            const role = req.role;

            if (role !== 'etudiant') {
                return res.status(403).json({ error: 'Only students can enroll in courses' });
            }

            const course = await coursModel.findById(id);
            if (!course) {
                return res.status(404).json({ error: 'Course not found' });
            }

            const student = await etudiantModel.findById(userId);
            if (!student) {
                return res.status(400).json({ error: 'Student profile not found' });
            }

            const isAlreadyEnrolled = await coursModel.isEnrolled(userId, id);
            if (isAlreadyEnrolled) {
                return res.status(400).json({ error: 'Already enrolled in this course' });
            }

            await coursModel.enrollStudent(userId, id);
            res.status(201).json({ message: 'Successfully enrolled in course' });
        } catch (err) {
            console.error('Error enrolling in course:', err);
            res.status(500).json({ error: err.message });
        }
    },

    async getEnrolledCourses(req, res) {
        try {
            const userId = req.userId;
            const courses = await coursModel.getEnrolledCourses(userId);
            res.json(courses);
        } catch (err) {
            console.error('Error fetching enrolled courses:', err);
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = coursController;
