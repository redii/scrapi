-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Job" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "crontab" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "httpMethod" TEXT NOT NULL DEFAULT 'GET',
    "postData" TEXT,
    "headers" TEXT,
    "saveFile" BOOLEAN NOT NULL DEFAULT true,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Job" ("createdAt", "crontab", "enabled", "headers", "id", "name", "saveFile", "updatedAt", "url") SELECT "createdAt", "crontab", "enabled", "headers", "id", "name", "saveFile", "updatedAt", "url" FROM "Job";
DROP TABLE "Job";
ALTER TABLE "new_Job" RENAME TO "Job";
CREATE UNIQUE INDEX "Job_name_key" ON "Job"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
