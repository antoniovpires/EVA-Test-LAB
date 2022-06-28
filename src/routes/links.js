const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
const { isLoggedIn } = require('../lib/auth');

async function main(req, userId) {
    await prisma.links.create({
        data: {
            title: req.body.title,
            url: req.body.url,
            description: req.body.description,
            user_id: userId
        }
      })
}

router.get('/add', (req, res) => {
    res.render('links/add');
});

router.post('/add', async (req, res) => {
    let userId = req._passport.session.user
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
    const { title, description, url} = req.body; 
    await prisma.links.update({
        where: {
            id: parseInt(req.params.id), 
        },
        data: {
            title: title,
            description: description,
            url: url
        },
    });
    req.flash('success', 'Link Updated Successfully');
    res.redirect('/links');
});

module.exports = router;