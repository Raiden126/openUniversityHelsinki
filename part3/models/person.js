const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
    .then(result => {
        console.log('connected to mongodb')
    })
    .catch(error => {
        console.log('error connecting to mongodb', error.message)
    })

const phoneNumberValidator = (value) => {
    const phoneNumberRegex = /^\d{2,3}-\d+$/;
    return phoneNumberRegex.test(value);
};

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String,
        minLength: 8,
        validate: {
            validator: phoneNumberValidator,
            message: 'Phone number must be in format of xx-xxxxxx/xxx-xxxxx',
        }
    }
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)