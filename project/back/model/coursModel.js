const pool = require('../config/database');

const coursModel = {
    async findAll() {
        const query = 'SELECT * FROM "COURS"';
        const result = await pool.query(query);
        return result.rows;
    },

    async findById(id) {
        const query = 'SELECT * FROM "COURS" WHERE "idCours" = $1';
        const result = await pool.query(query, [id]);
        return result.rows[0];
    },

    async findByTeacher(idEnseignant) {
        const query = 'SELECT * FROM "COURS" WHERE "idEnseignant" = $1';
        const result = await pool.query(query, [idEnseignant]);
        return result.rows;
    },

    async create(coursData) {
        const { nom, module, idEnseignant } = coursData;
        const query = `
            INSERT INTO "COURS" ("Nom", "Module", "idEnseignant")
            VALUES ($1, $2, $3)
            RETURNING *
        `;
        const result = await pool.query(query, [nom, module, idEnseignant]);
        return result.rows[0];
    },

    async update(id, coursData) {
        const { nom, module } = coursData;
        const query = `
            UPDATE "COURS"
            SET "Nom" = $1, "Module" = $2
            WHERE "idCours" = $3
            RETURNING *
        `;
        const result = await pool.query(query, [nom, module, id]);
        return result.rows[0];
    },

    async delete(id) {
        const query = 'DELETE FROM "COURS" WHERE "idCours" = $1';
        await pool.query(query, [id]);
    },

    async enrollStudent(idUser, idCours) {
        const query = `
            INSERT INTO "ETUDIANT_COURS" ("idUser", "idCours", "temps_debut", "temps_fin", "temps_concentration")
            VALUES ($1, $2, 0, 0, 0)
            ON CONFLICT ("idUser", "idCours") DO NOTHING
            RETURNING *
        `;
        const result = await pool.query(query, [idUser, idCours]);
        return result.rows[0];
    },

    async isEnrolled(idUser, idCours) {
        const query = 'SELECT * FROM "ETUDIANT_COURS" WHERE "idUser" = $1 AND "idCours" = $2';
        const result = await pool.query(query, [idUser, idCours]);
        return result.rows.length > 0;
    },

    async getEnrolledCourses(idUser) {
        const query = `
            SELECT c.* FROM "COURS" c
            INNER JOIN "ETUDIANT_COURS" ec ON c."idCours" = ec."idCours"
            WHERE ec."idUser" = $1
        `;
        const result = await pool.query(query, [idUser]);
        return result.rows;
    }
};

module.exports = coursModel;
