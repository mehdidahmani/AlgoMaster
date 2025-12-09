-- ============================
-- AlgoMaster Database Schema
-- PostgreSQL Database Setup
-- ============================

-- Create Database (run this separately if needed)
-- CREATE DATABASE algomaster;

-- ============================
-- TABLE USER
-- ============================
CREATE TABLE IF NOT EXISTS "USER" (
    "idUser" SERIAL PRIMARY KEY,
    "Nom" VARCHAR(100),
    "Prenom" VARCHAR(100),
    "DateNaissance" DATE,
    "Email" VARCHAR(150) UNIQUE NOT NULL,
    "motDePasse" VARCHAR(255) NOT NULL
);

-- ============================
-- TABLE ETUDIANT
-- ============================
CREATE TABLE IF NOT EXISTS "ETUDIANT" (
    "idUser" INT PRIMARY KEY,
    "Specialite" VARCHAR(150),
    "Annee" INT,
    FOREIGN KEY ("idUser") REFERENCES "USER"("idUser") ON DELETE CASCADE
);

-- ============================
-- TABLE ENSEIGNANT
-- ============================
CREATE TABLE IF NOT EXISTS "ENSEIGNANT" (
    "idUser" INT PRIMARY KEY,
    "Specialite" VARCHAR(150),
    "Grade" VARCHAR(100),
    FOREIGN KEY ("idUser") REFERENCES "USER"("idUser") ON DELETE CASCADE
);

-- ============================
-- TABLE COURS
-- ============================
CREATE TABLE IF NOT EXISTS "COURS" (
    "idCours" SERIAL PRIMARY KEY,
    "Nom" VARCHAR(150),
    "Module" VARCHAR(150),
    "idEnseignant" INT,
    FOREIGN KEY ("idEnseignant") REFERENCES "ENSEIGNANT"("idUser") ON DELETE SET NULL
);

-- ============================
-- TABLE EXERCICE
-- ============================
CREATE TABLE IF NOT EXISTS "EXERCICE" (
    "idExercice" SERIAL PRIMARY KEY,
    "Contenu" TEXT,
    "Difficulte" VARCHAR(50),
    "Type" VARCHAR(50),
    "idEnseignant" INT,
    FOREIGN KEY ("idEnseignant") REFERENCES "ENSEIGNANT"("idUser") ON DELETE SET NULL
);

-- ============================
-- TABLE SOLUTION
-- ============================
CREATE TABLE IF NOT EXISTS "SOLUTION" (
    "idSolution" SERIAL PRIMARY KEY,
    "Contenu" TEXT,
    "idExercice" INT,
    FOREIGN KEY ("idExercice") REFERENCES "EXERCICE"("idExercice") ON DELETE CASCADE
);

-- ============================
-- TABLE FEEDBACK
-- ============================
CREATE TABLE IF NOT EXISTS "FEEDBACK" (
    "idFeedback" SERIAL PRIMARY KEY,
    "Avis" VARCHAR(255),
    "idUser" INT,
    FOREIGN KEY ("idUser") REFERENCES "USER"("idUser") ON DELETE CASCADE
);

-- ============================
-- TABLE ETUDIANT_EXERCICE (Relation N-N)
-- ============================
CREATE TABLE IF NOT EXISTS "ETUDIANT_EXERCICE" (
    "idUser" INT,
    "idExercice" INT,
    PRIMARY KEY ("idUser", "idExercice"),
    FOREIGN KEY ("idUser") REFERENCES "ETUDIANT"("idUser") ON DELETE CASCADE,
    FOREIGN KEY ("idExercice") REFERENCES "EXERCICE"("idExercice") ON DELETE CASCADE
);

-- ============================
-- TABLE ETUDIANT_COURS (Relation N-N)
-- ============================
CREATE TABLE IF NOT EXISTS "ETUDIANT_COURS" (
    "idUser" INT,
    "idCours" INT,
    "temps_debut" INT,
    "temps_fin" INT,
    "temps_concentration" INT,
    PRIMARY KEY ("idUser", "idCours"),
    FOREIGN KEY ("idUser") REFERENCES "ETUDIANT"("idUser") ON DELETE CASCADE,
    FOREIGN KEY ("idCours") REFERENCES "COURS"("idCours") ON DELETE CASCADE
);

-- ============================
-- TABLE USER_FEEDBACK (Relation N-N)
-- ============================
CREATE TABLE IF NOT EXISTS "USER_FEEDBACK" (
    "idUser" INT,
    "idFeedback" INT,
    PRIMARY KEY ("idUser", "idFeedback"),
    FOREIGN KEY ("idUser") REFERENCES "USER"("idUser") ON DELETE CASCADE,
    FOREIGN KEY ("idFeedback") REFERENCES "FEEDBACK"("idFeedback") ON DELETE CASCADE
);

-- ============================
-- Create Indexes for Performance
-- ============================
CREATE INDEX IF NOT EXISTS idx_user_email ON "USER"("Email");
CREATE INDEX IF NOT EXISTS idx_etudiant_user ON "ETUDIANT"("idUser");
CREATE INDEX IF NOT EXISTS idx_enseignant_user ON "ENSEIGNANT"("idUser");
CREATE INDEX IF NOT EXISTS idx_cours_enseignant ON "COURS"("idEnseignant");
CREATE INDEX IF NOT EXISTS idx_exercice_enseignant ON "EXERCICE"("idEnseignant");
CREATE INDEX IF NOT EXISTS idx_solution_exercice ON "SOLUTION"("idExercice");

-- ============================
-- Sample Data (Optional)
-- ============================
-- Uncomment to insert sample data

-- INSERT INTO "USER" ("Nom", "Prenom", "DateNaissance", "Email", "motDePasse")
-- VALUES ('Dupont', 'Jean', '2000-01-15', 'jean.dupont@example.com', '$2b$10$hashedpassword');
