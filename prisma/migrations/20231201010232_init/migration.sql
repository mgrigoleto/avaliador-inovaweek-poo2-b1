/*
  Warnings:

  - You are about to alter the column `matricula_avaliador` on the `Avaliacao` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.
  - The primary key for the `Aluno` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `matricula` on the `Aluno` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.
  - The primary key for the `Professor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `matricula` on the `Professor` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Avaliacao" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "datahora" DATETIME NOT NULL,
    "criterio" TEXT,
    "nota" REAL NOT NULL,
    "matricula_avaliador" BIGINT NOT NULL,
    CONSTRAINT "Avaliacao_matricula_avaliador_fkey" FOREIGN KEY ("matricula_avaliador") REFERENCES "Aluno" ("matricula") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Avaliacao_matricula_avaliador_fkey" FOREIGN KEY ("matricula_avaliador") REFERENCES "Professor" ("matricula") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Avaliacao" ("criterio", "datahora", "id", "matricula_avaliador", "nota") SELECT "criterio", "datahora", "id", "matricula_avaliador", "nota" FROM "Avaliacao";
DROP TABLE "Avaliacao";
ALTER TABLE "new_Avaliacao" RENAME TO "Avaliacao";
CREATE TABLE "new_Aluno" (
    "nome" TEXT NOT NULL,
    "matricula" BIGINT NOT NULL PRIMARY KEY,
    "id_projeto" TEXT,
    CONSTRAINT "Aluno_id_projeto_fkey" FOREIGN KEY ("id_projeto") REFERENCES "Projeto" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Aluno" ("id_projeto", "matricula", "nome") SELECT "id_projeto", "matricula", "nome" FROM "Aluno";
DROP TABLE "Aluno";
ALTER TABLE "new_Aluno" RENAME TO "Aluno";
CREATE UNIQUE INDEX "Aluno_matricula_key" ON "Aluno"("matricula");
CREATE TABLE "new_Professor" (
    "nome" TEXT NOT NULL,
    "matricula" BIGINT NOT NULL PRIMARY KEY
);
INSERT INTO "new_Professor" ("matricula", "nome") SELECT "matricula", "nome" FROM "Professor";
DROP TABLE "Professor";
ALTER TABLE "new_Professor" RENAME TO "Professor";
CREATE UNIQUE INDEX "Professor_matricula_key" ON "Professor"("matricula");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
