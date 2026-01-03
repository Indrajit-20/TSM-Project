const mongoose = require('mongoose');

const tourPackageSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'Package name is required'],
        trim: true 
    },
    destination: { 
        type: String, 
        required: [true, 'Destination is required'] 
    },
    price: { 
        type: Number, 
        required: [true, 'Price is required'] 
    },
    duration: { 
        type: String, 
        required: true // Example: "3 Nights / 4 Days"
    },
    image_url: { 
        type: String, 
        required: true // Example: "/images/goa.jpg"
    },
    package_type: { 
        type: String, 
        enum: ['Domestic', 'International'], 
        default: 'Domestic' 
    },
    description: { 
        type: String 
    }
}, { timestamps: true }); // This adds createdAt and updatedAt automatically

module.exports = mongoose.model('TourPackage', tourPackageSchema);