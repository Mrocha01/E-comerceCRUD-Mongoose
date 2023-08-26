const Product = require('../models/Product');

module.exports = class ProductController {

    static async showProducts(req, res) {
        
        const products = await Product.find().lean();

        // Formatando o preço de cada produto no formato monetário
        const productsWithFormattedPrice = products.map(product => {
        return {
            ...product,
            formattedPrice: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)
        };
    });
        res.render('products/all', { products: productsWithFormattedPrice});
    }

    static createProduct(req, res) {
        res.render('products/create')
    };

    static async createProductPost(req, res) {

        const { name, image, price, description } = req.body;

        // Remover todos os caracteres não numéricos e converter o formato
        const numericPrice = parseFloat(price.replace(/[^\d.,]/g, ''));

        const product = new Product({
            name,
            image,
            price: numericPrice,
            description});

            try {
                await product.save();
                res.redirect('/products');
            } catch (error) {
                console.error('Erro ao salvar produto:', error);
                res.status(500).send('Ocorreu um erro ao salvar o produto.');
            };
    };

    static async getProduct(req, res) {
        const id = req.params.id;

        const product = await Product.findById(id).lean();

        res.render('products/product', { product });
    };

    static async removeProduct(req, res) {

        const id = req.params.id;

        await Product.deleteOne({_id: id});

        res.redirect('/products');
    };

    static async editProduct(req, res) {

        const id = req.params.id;

        const product = await Product.findById(id).lean();

        res.render('products/edit', { product });
    };

    static async editProductPost(req, res) {

        const {id, name, image, price, description } = req.body;

         // Remover todos os caracteres não numéricos e converter o formato
         const numericPrice = parseFloat(price.replace(/[^\d.,]/g, ''));

        const product = {
            name,
            image,
            price: numericPrice,
            description};

            try {
                await Product.updateOne({ _id: id }, product);
                res.redirect('/products');
            } catch (error) {
                console.error('Erro ao salvar produto:', error);
                res.status(500).send('Ocorreu um erro ao editar o produto.');
            };
    };
}