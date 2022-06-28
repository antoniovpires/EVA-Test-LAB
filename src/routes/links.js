const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
const { isLoggedIn } = require('../lib/auth');
const multer  = require('multer')
const upload = multer({ dest: 'src/public/images' })

async function main(req, userId) {
    await prisma.links.create({
        data: {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            user_id: userId,
            image: req.file.filename
        }
      })
}

router.get('/add', (req, res) => {
    res.render('links/add');
});

router.post('/add', upload.single('productImage'), async (req, res) => {
    let userId = req._passport.session.user
    console.log(req.file)
    main(req, userId)
    .catch((e) => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
    req.flash('success', 'Link Saved Successfully');
    res.redirect('/links');
});

router.get('/', isLoggedIn, async (req, res) => {
    const links = await prisma.links.findMany({
        where: {
            user_id: req._passport.session.user,
        },
    });
    res.render('links/list', { links });
});

router.get('/delete/:id', async (req, res) => {
    await prisma.links.delete({
        where: {
            id: parseInt(req.params.id),
        },
    });
    req.flash('success', 'Link Removed Successfully');
    res.redirect('/links');
});

router.get('/edit/:id', async (req, res) => {
    const links = await prisma.links.findMany({
        where: {
            id: parseInt(req.params.id),
        },
    });
    res.render('links/edit', {link: links[0]});
});

router.post('/edit/:id', async (req, res) => {
    const { name, price, description} = req.body; 
    await prisma.links.update({
        where: {
            id: parseInt(req.params.id), 
        },
        data: {
            name: name,
            description: description,
            price: price
        },
    });
    req.flash('success', 'Link Updated Successfully');
    res.redirect('/links');
});

router.get('/:id', async (req, res) => {
    const links = await prisma.links.findMany({
        where: {
            id: parseInt(req.params.id),
        },
    });
    console.log(links[0])
    res.render('links/product', {link: links[0]});
});

module.exports = router;