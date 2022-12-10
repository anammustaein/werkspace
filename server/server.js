const express = require("express");
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()
const app = express();
const port = 3000;

app.get("/", async (req, res) => {
    const allUsers = await prisma.werkspaceuser.findMany();
    res.json(allUsers);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});