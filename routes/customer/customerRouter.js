const express = require("express");
const router = express.Router();
const {addCustomer, getCustomer, getCustomerById, updateCustomerById} = require("./customerController");

router.get("/", async (req, res) =>{
try {
    const customers = await getCustomer()
    res.json({
        message: "success",
        payload: customers
    });
} catch (error) {
    res.json({
        message: "failure",
        payload: error.message
    });
    
}
});

router.get("/:Id", async (req, res) =>{
    try {
        const customer = await getCustomerById(req.params.Id);
        res.json({
          message: "success",
          payload: customer,
        });
    } catch (error) {
        res.status(500).json({ message: "failure", payload: error.message });
    }
});  

router.post("/", async (req, res) =>{
    try {
        const newCustomer = await addCustomer(req.body)
        res.json({
            message: " customer has been successfully added",
            payload: newCustomer
        })
    } catch (error) {
        res.json({
            message: "failure",
            payload: error.message
        });
        
    }
});

router.put("/:customerId", async (req, res)=> {
    try {
        const updatedCustomer = await updateCustomerById(req.params.customerId, req.body)
        res.json({
            message: "success",
            payload: updatedCustomer,
        });
    } catch (error) {
        res.json({
            message: "failure",
            payload: error.message,
        });
    }
})


module.exports = router