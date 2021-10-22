const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({
    extended: true
  }));
router.use(bodyParser.json());

let allCategories = [
  { id: 1, category: "work" },
  { id: 2, category: "school" },
  { id: 3, category: "health" },
];

// GET - get all categories (works)
router.get('/', (req, res) => {
    res.status(200).json(allCategories);
});


// POST - add new category (works)
router.post('/', (req, res) => {
    const {
        id,
        category
    } = req.body;

    const catExists = allCategories.find(item => item.category === category)
    if(catExists) return res.send("Category already exists.");

    let newId = allCategories.length + Math.floor(Math.random() * 258);


    const newCat = {
        id: newId,
        category
    };

    allCategories.push(newCat);
    res.send(newCat);
});

// GET - specific categories (works)
router.get('/:catId', (req, res) => {
    const { catId } = req.params;
    const findTask = allCategories.filter(item => {
        return item.category === catId;
    });
    if (findTask) {
        res.status(200).json(findTask);
    } 
});

// PUT - update category (works)
router.put('/:catId', async (req, res) => {
    const { catId } = req.params;

    const {
        id,
        category,
    } = req.body;

    const editCat = allCategories.find(item => item.category === catId);
    if(!editCat) return res.send("category does not exist");

    // check that val is present, if not use prev. if new val use new.
    const updatedField = (val, prev) => !val ? prev : val;

    const updatedCat = {
        ...editCat,
        id,
        category: updatedField(category, editCat.category),
    }

    const taskIndex = allCategories.findIndex(item => item.id === catId);
    allCategories.splice(taskIndex, 1, updatedCat);
    res.send(updatedCat);

});

// DELETE - delete categories (works)
router.delete('/:catId', (req, res) => {
    const { catId } = req.params;

    let removeCat = allCategories.find(item => item.category === catId);
    if(!removeCat) return res.status(404).send('Category does not exist.');

    allCategories = allCategories.filter(item => item.category !== catId);
    res.send('Success');
    
});

module.exports = router;