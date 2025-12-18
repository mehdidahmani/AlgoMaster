const pool = require('../config/database');

const exerciceModel = {
    async findAll() {
        const query = 'SELECT * FROM "EXERCICE"';
        const result = await pool.query(query);
        return result.rows;
    },

    async findById(id) {
        const query = 'SELECT * FROM "EXERCICE" WHERE "idExercice" = $1';
        const result = await pool.query(query, [id]);
        return result.rows[0];
    },

    async findByTeacher(idEnseignant) {
        const query = 'SELECT * FROM "EXERCICE" WHERE "idEnseignant" = $1';
        const result = await pool.query(query, [idEnseignant]);
        return result.rows;
    },

    async create(exerciceData) {
        const { contenu, difficulte, type, idEnseignant } = exerciceData;
        const query = `
            INSERT INTO "EXERCICE" ("Contenu", "Difficulte", "Type", "idEnseignant")
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;
        const result = await pool.query(query, [contenu, difficulte, type, idEnseignant]);
        return result.rows[0];
    },

    async update(id, exerciceData) {
        const { contenu, difficulte, type } = exerciceData;
        const query = `
            UPDATE "EXERCICE"
            SET "Contenu" = $1, "Difficulte" = $2, "Type" = $3
            WHERE "idExercice" = $4
            RETURNING *
        `;
        const result = await pool.query(query, [contenu, difficulte, type, id]);
        return result.rows[0];
    },

    async delete(id) {
        const query = 'DELETE FROM "EXERCICE" WHERE "idExercice" = $1';
        await pool.query(query, [id]);
    },

    async enrollStudent(idUser, idExercice) {
        const query = `
            INSERT INTO "ETUDIANT_EXERCICE" ("idUser", "idExercice")
            VALUES ($1, $2)
            ON CONFLICT ("idUser", "idExercice") DO NOTHING
            RETURNING *
        `;
        const result = await pool.query(query, [idUser, idExercice]);
        return result.rows[0];
    },

    async isEnrolled(idUser, idExercice) {
        const query = 'SELECT * FROM "ETUDIANT_EXERCICE" WHERE "idUser" = $1 AND "idExercice" = $2';
        const result = await pool.query(query, [idUser, idExercice]);
        return result.rows.length > 0;
    },

    async getEnrolledExercises(idUser) {
        const query = `
            SELECT e.* FROM "EXERCICE" e
            INNER JOIN "ETUDIANT_EXERCICE" ee ON e."idExercice" = ee."idExercice"
            WHERE ee."idUser" = $1
        `;
        const result = await pool.query(query, [idUser]);
        return result.rows;
    }
};

module.exports = exerciceModel;
