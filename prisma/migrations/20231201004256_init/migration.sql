-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Aluno" (
    "nome" TEXT NOT NULL,
    "matricula" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_projeto" TEXT,
    CONSTRAINT "Aluno_id_projeto_fkey" FOREIGN KEY ("id_projeto") REFERENCES "Projeto" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Aluno" ("id_projeto", "matricula", "nome") SELECT "id_projeto", "matricula", "nome" FROM "Aluno";
DROP TABLE "Aluno";
ALTER TABLE "new_Aluno" RENAME TO "Aluno";
CREATE UNIQUE INDEX "Aluno_matricula_key" ON "Aluno"("matricula");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
