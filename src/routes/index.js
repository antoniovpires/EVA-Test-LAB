const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// async function main() {
//     await prisma.users.create({
//         data: {
//           username: 'Alice',
//           email: 'alice@prisma.io',
//           password: 'password1'
//         },
//       })
    
//       const allUsers = await prisma.users.findMany()
//       console.dir(allUsers)
// }

// main().catch((e) => {
//     throw e
// }).finally(async () => {
//     await prisma.$disconnect()
// });

router.get('/', async (req, res) => {
    res.render('index');
});

module.exports = router;