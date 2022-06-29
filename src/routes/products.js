const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
const { isLoggedIn } = require('../lib/auth');
const multer  = require('multer')
const upload = multer({ dest: 'src/public/images' })


////////// CRIAÇÃO DO PRODUTO //////////

async function main(req, userId) {
    await prisma.products.create({
        data: {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            user_id: userId,
            image: req.files[0].filename,
            images: req.files
        }
      })
}

router.get('/add', (req, res) => {
    res.render('products/add');
});

router.post('/add', upload.array('productImage', 5), async (req, res) => {
    let userId = req._passport.session.user
    main(req, userId)
    .catch((e) => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
    req.flash('success', 'Produto salvo com sucesso!');
    res.redirect('/products');
});

////////// LISTANDO TODOS OS PRODUTOS //////////

router.get('/', isLoggedIn, async (req, res) => {
    const products = await prisma.products.findMany({
        where: {
            user_id: req._passport.session.user,
        },
    });
    res.render('products/list', { products });
});

////////// EXCLUINDO PRODUTOS //////////

router.get('/delete/:id', async (req, res) => {
    await prisma.products.delete({
        where: {
            id: parseInt(req.params.id),
        },
    });
    req.flash('success', 'Produto removido com sucesso!');
    res.redirect('/products');
});

////////// EDITANDO O PRODUTO //////////

router.get('/edit/:id', async (req, res) => {
    const products = await prisma.products.findMany({
        where: {
            id: parseInt(req.params.id),
        },
    });
    res.render('products/edit', {product: products[0]});
});

router.post('/edit/:id', async (req, res) => {
    const { name, price, description} = req.body; 
    await prisma.products.update({
        where: {
            id: parseInt(req.params.id), 
        },
        data: {
            name: name,
            description: description,
            price: price
        },
    });
    req.flash('success', 'Produto atualizado com sucesso!');
    res.redirect('/products');
});

////////// ABRINDO UM PRODUTO INDIVIDUALMENTE //////////

router.get('/:id', async (req, res) => {
    const products = await prisma.products.findMany({
        where: {
            id: parseInt(req.params.id),
        },
    });
    res.render('products/product', {product: products[0]});
});

module.exports = router;