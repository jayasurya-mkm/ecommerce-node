const Categories = require('../models/category.model');
const responseMaker = require('../common/response.common');

async function createcategory(req, res) {
    try {
        const category = await Categories.find({name: req.body.data.name});
        if(category.length > 0) {
            return res.status(200).json(responseMaker.faildResponse(301, 'Category already existing'));
        }

        let cat = new Categories({
            ...req.body.data
        });
        cat.save().then((category) => {
            res.status(201).json(responseMaker.successResponse(
                category,
                201,
                'category create successfully',
            ));
        }).catch(error => res.status(500).json(responseMaker.faildResponse(500, error)));
    } catch (e) {
        res.status(500).json(responseMaker.faildResponse(500, e));
    }
}

async function getCategory(req, res) {
    try {
        let category = [];
        if (!!req.params.category_id) {
            category = await Categories.find({_id: req.params.category_id});
        } else {
            category = await Categories.find();
        }
        res.status(201).json(responseMaker.successResponse(
            category,
            201,
            'getCatrgory successfully',
        ));
    } catch (e) {
        res.status(500).json(responseMaker.faildResponse(500, e));
    }
}

async function editCatgory(req, res) {
    try {
        await Categories.findByIdAndUpdate(
            req.params.category_id,
            { ...JSON.parse(JSON.stringify(req.body.data)) },
            (err, result) => {
                if (err) {
                    res.status(500).json(responseMaker.faildResponse(500, err));
                } else {
                    res.status(201).json(
                        responseMaker.successResponse(
                            result,
                            201,
                            "Category update successfully"
                        )
                    );
                }
            }
        )
    } catch (e) {
        res.status(500).json(responseMaker.faildResponse(500, e))
    }
}

module.exports = {
    createcategory: createcategory,
    getCategory: getCategory,
    editCatgory: editCatgory
}