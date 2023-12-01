/*
  Warnings:

  - You are about to drop the column `matricula_avaliador` on the `Avaliacao` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Avaliacao" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "datahora" DATETIME NOT NULL,
    "criterio" TEXT,
    "nota" REAL NOT NULL,
    "matricula_avaliador_aluno" BIGINT,
    "matricula_avaliador_professor" BIGINT,
    CONSTRAINT "Avaliacao_matricula_avaliador_aluno_fkey" FOREIGN KEY ("matricula_avaliador_aluno") REFERENCES "Aluno" ("matricula") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Avaliacao_matricula_avaliador_professor_fkey" FOREIGN KEY ("matricula_avaliador_professor") REFERENCES "Professor" ("matricula") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Avaliacao" ("criterio", "datahora", "id", "nota") SELECT "criterio", "datahora", "id", "nota" FROM "Avaliacao";
DROP TABLE "Avaliacao";
ALTER TABLE "new_Avaliacao" RENAME TO "Avaliacao";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
