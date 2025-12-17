-- CreateTable
CREATE TABLE "Edge" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "cost" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Graph" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "_EdgeToGraph" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_EdgeToGraph_A_fkey" FOREIGN KEY ("A") REFERENCES "Edge" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_EdgeToGraph_B_fkey" FOREIGN KEY ("B") REFERENCES "Graph" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_EdgeToGraph_AB_unique" ON "_EdgeToGraph"("A", "B");

-- CreateIndex
CREATE INDEX "_EdgeToGraph_B_index" ON "_EdgeToGraph"("B");
