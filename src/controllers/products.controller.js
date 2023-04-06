var multer = require('multer');
var path = require('path');
var helper = require('../common/helper/common.helper');

const Product = require('../models/product.model');
const Categories = require('../models/category.model');
const responseMaker = require('../common/response.common');

async function saveProducts(req, res) {
    try {

        let category = [];
        category = await Categories.find({ name: req.body.category_type });
        if (category.length === 0) {
            await new Categories({
                name: req.body.category_type
            }).save().then(cat => {
                category = [cat];
            }).catch(responseMaker.faildResponse(500, 'error on creating new category'))
        }

        await new Product({
            category_id: category[0]._id,
            images: helper.multerCustomeFilePathMaker(req.files),
            ...req.body,
        }).save().then((product) => {
            res.status(201).json(responseMaker.successResponse(
                product,
                201,
                'Product create successfully',
            ));
        }).catch(error => res.status(500).json(responseMaker.faildResponse(500, error)));
       
    } catch (e) {
        res.status(500).json(responseMaker.faildResponse(500, 'Internal server error'))
    }
}

async function getProductByTypes(req, res) {
    try {
        await Product.find({ productType: req.params.type }).then((product) => {
            res.status(200).json(responseMaker.successResponse(
                product,
                200,
                'Fetch product successfully'
            ));
        }).catch((error) => res.status(500).json(responseMaker.faildResponse(500, error)));
    } catch (e) {
        res.status(500).json(responseMaker.faildResponse(500, 'Internal server error'))
    }
}

async function getProductByID(req, res) {
    try {
        let product = [];
        product = await Product.find({ _id: req.params.product_id });
        res.status(200).json(responseMaker.successResponse(
            {product: product},
            200,
            'Fetch product successfully'
        ));
    } catch (e) {
        res.status(500).json(responseMaker.faildResponse(500, e))
    }
}

async function editProduct(req, res) {
    try {
        console.log(req.body);
        await Product.findByIdAndUpdate(
            req.params.product_id,
            { ...req.body.data },
            (err, result) => {
                if (err) {
                    res.status(500).json(responseMaker.faildResponse(500, err));
                } else {
                    res.status(201).json(
                        responseMaker.successResponse(
                            201,
                            result,
                            "Prodcut update successfully"
                        )
                    );
                }
            }
        ).catch(error => res.status(500).json(responseMaker.faildResponse(500, error)));
    } catch (e) {
        res.status(500).json(responseMaker.faildResponse(500, e))
    }
}


let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/public/uploads/products');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

let validateFile = function (file, cb) {
    let allowedFileTypes = /jpeg|jpg|png|JPEG|JPG|PNG/;
    const extension = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = allowedFileTypes.test(file.mimetype);
    if (extension && mimeType) {
        return cb(null, true);
    } else {
        cb("Invalid file type. Only JPEG, PNG, JPG file are allowed.")
    }
}

let upload = multer(
    {
        storage: storage,
        limits: { fileSize: 1024 * 1024 * 5 },
        fileFilter: function (req, file, callback) {
            validateFile(file, callback);
        }
    }
);


module.exports = {
    saveProducts: saveProducts,
    getProductByTypes: getProductByTypes,
    editProduct: editProduct,
    fileUpload: upload,
    getProductByID: getProductByID
}