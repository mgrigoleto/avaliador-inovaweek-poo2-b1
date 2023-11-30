/*
  Warnings:

  - The primary key for the `Projeto` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Professor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Avaliacao` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Aluno` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Projeto" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "area" TEXT NOT NULL
);
INSERT INTO "new_Projeto" ("area", "id", "nome") SELECT "area", "id", "nome" FROM "Projeto";
DROP TABLE "Projeto";
ALTER TABLE "new_Projeto" RENAME TO "Projeto";
CREATE TABLE "new_Professor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "matricula" INTEGER NOT NULL
);
INSERT INTO "new_Professor" ("id", "matricula", "nome") SELECT "id", "matricula", "nome" FROM "Professor";
DROP TABLE "Professor";
ALTER TABLE "new_Professor" RENAME TO "Professor";
CREATE UNIQUE INDEX "Professor_matricula_key" ON "Professor"("matricula");
CREATE TABLE "new_Avaliacao" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "datahora" DATETIME NOT NULL,
    "criterio" TEXT,
    "nota" REAL NOT NULL,
    "id_avaliador" TEXT NOT NULL,
    CONSTRAINT "Avaliacao_id_avaliador_fkey" FOREIGN KEY ("id_avaliador") REFERENCES "Aluno" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Avaliacao_id_avaliador_fkey" FOREIGN KEY ("id_avaliador") REFERENCES "Professor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Avaliacao" ("criterio", "datahora", "id", "id_avaliador", "nota") SELECT "criterio", "datahora", "id", "id_avaliador", "nota" FROM "Avaliacao";
DROP TABLE "Avaliacao";
ALTER TABLE "new_Avaliacao" RENAME TO "Avaliacao";
CREATE TABLE "new_Aluno" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "matricula" INTEGER NOT NULL,
    "id_projeto" TEXT NOT NULL,
    CONSTRAINT "Aluno_id_projeto_fkey" FOREIGN KEY ("id_projeto") REFERENCES "Projeto" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Aluno" ("id", "id_projeto", "matricula", "nome") SELECT "id", "id_projeto", "matricula", "nome" FROM "Aluno";
DROP TABLE "Aluno";
ALTER TABLE "new_Aluno" RENAME TO "Aluno";
CREATE UNIQUE INDEX "Aluno_matricula_key" ON "Aluno"("matricula");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
