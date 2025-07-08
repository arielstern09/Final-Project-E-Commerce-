const Customer = require("./customerModel")

const getCustomer = async () =>{

    try {
      const customers = await Customer.find()  
      return customers
    } catch (error) {
        throw error
    }
    
}

// get User by ID
const getCustomerById = async (Id) => {
    try {
        const customer = await Customer.findById(Id)
        return customer;
    } catch (error) {
        throw error
    }
}

const addCustomer = async (customerData) => {

    try {
        // Add new user to database!
        const newCustomer = await Customer.create(customerData)
        return newCustomer

    } catch (error) {
        throw error; 
    }
};

module.exports = {
    getCustomer,
    getCustomerById,
    addCustomer
}