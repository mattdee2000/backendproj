// create a reference to the model
let Inventory = require('../models/inventory');

function getErrorMessage(err) {
    if (err.errors) {
        for (let errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].message;
        }
    } else {
        return 'Unknown server error';
    }
};

module.exports.inventoryList = function (req, res, next) {

    Inventory.find((err, inventoryList) => {
        //console.log(inventoryList);
        if (err) {
            console.error(err);
            return res.status(400).send({
                success: false,
                message: getErrorMessage(err)
            });
        }
        else {
            // res.render('inventory/list', {
            //     title: 'Inventory List',
            //     InventoryList: inventoryList,
            //     userName: req.user ? req.user.username : ''
            // })
            res.status(200).json(inventoryList);
        }
    });
}

exports.invetoryByID = function (req, res, next) {

    let id = req.params.id;
    
    Inventory.findById(id, (err, item) => {
        if (err) return next(err);
        if (!item) return next(new Error('Failed to load a item '+ id +' from the inventory '));

        req.item = item;
        console.log(item);
        next();
    });
};

exports.getItem = function (req, res) {
    res.status(200).json(req.item);
};

// module.exports.displayEditPage = (req, res, next) => {

//     let id = req.params.id;

//     Inventory.findById(id, (err, itemToEdit) => {
//         if (err) {
//             console.log(err);
//             res.end(err);
//         }
//         else {
//             //show the edit view
//             res.render('inventory/add_edit', {
//                 title: 'Edit Item',
//                 item: itemToEdit,
//                 userName: req.user ? req.user.username : ''
//             })
//         }
//     });
// }


module.exports.processEdit = (req, res, next) => {

    let id = req.params.id

    // let updatedItem = Inventory({
    //     _id: req.body.id,
    //     item: req.body.item,
    //     qty: req.body.qty,
    //     status: req.body.status,
    //     size: {
    //         h: req.body.size_h,
    //         w: req.body.size_w,
    //         uom: req.body.size_uom,
    //     },
    //     tags: req.body.tags.split(",").map(word => word.trim())
    // });

    let updatedItem = new Inventory(req.body);

    Inventory.updateOne({ _id: id }, updatedItem, (err) => {
        if (err) {
            console.log(err);
            // res.end(err);
           return res.status(400).json({
                success: false,
                message: getErrorMessage(err)
            });
        }
        else {
            // console.log(req.body);
            // refresh the book list
            // res.redirect('/inventory/list');
            return res.status(200).json(updatedItem);
        }
    });

}


module.exports.performDelete = (req, res, next) => {

    let id = req.params.id;


    Inventory.deleteOne({ _id: id }, (err) => {
        if (err) {
            console.log(err);
            // res.end(err);
            return res.status(400).send({
                success: false,
                message: getErrorMessage(err)
            });
        }
        else {
            // refresh the book list
            // res.redirect('/inventory/list');
            return res.status(200).json({
                success: true,
                message: "Item removed successfully."
            });
        }
    });

}


// module.exports.displayAddPage = (req, res, next) => {

//     let newItem = Inventory();

//     res.render('inventory/add_edit', {
//         title: 'Add a new Item',
//         item: newItem,
//         userName: req.user ? req.user.username : ''
//     })

// }

module.exports.processAdd = (req, res, next) => {

    // let newItem = Inventory({
    //     _id: req.body.id,
    //     item: req.body.item,
    //     qty: req.body.qty,
    //     status: req.body.status,
    //     size: {
    //         h: req.body.size_h,
    //         w: req.body.size_w,
    //         uom: req.body.size_uom,
    //     },
    //     tags: req.body.tags.split(",").map(word => word.trim())
    // });

    console.log(req.body);

    let newItem = new Inventory(req.body);

    console.log(newItem);
    Inventory.create(newItem, (err, item) => {
        if (err) {
            console.log(err);
            // res.end(err);
            return res.status(400).send({
                success: false,
                message: getErrorMessage(err)
            });
        }
        else {
            // refresh the book list
            console.log(item);
            // res.redirect('/inventory/list');
            return res.status(200).json(item);
        }
    });

}