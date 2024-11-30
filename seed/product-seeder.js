const { default: mongoose } = require('mongoose');
const Product = require('../models/product');
mongoose.connect('mongodb://localhost:27017/shopping', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Seed products
const products = [
    new Product({
        imagePath: "https://image.api.playstation.com/vulcan/ap/rnd/202405/2216/444709c0fc44dc35a2080047237d8f9721c0df091d69a825.jpg",
        title: 'DB Sparkling Zero',
        description: 'EPIC!!!',
        price: 12
    }),
    new Product({
        imagePath: "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg",
        title: "Cyberpunk 2077",
        description: "Experience the future with breathtaking visuals and intense gameplay.",
        price: 50
    }),
    new Product({
        imagePath: "https://image.api.playstation.com/vulcan/ap/rnd/202010/1521/rYI2sFgLsO1AoeKvYrkkofTK.png",
        title: "The Last of Us Part II",
        description: "An emotional, action-packed journey.",
        price: 60
    }),
    new Product({
        imagePath: "https://upload.wikimedia.org/wikipedia/en/a/a4/God_of_War_Ragnarok_cover_art.jpg",
        title: "God of War Ragnarok",
        description: "Join Kratos and Atreus in their epic Norse saga.",
        price: 70
    }),
    new Product({
        imagePath: "https://m.media-amazon.com/images/I/81QspOXlrxL._AC_SL1500_.jpg",
        title: "Elden Ring",
        description: "A sprawling open-world fantasy adventure.",
        price: 60
    }),
    new Product({
        imagePath: "https://upload.wikimedia.org/wikipedia/en/2/2d/Call_of_Duty_Modern_Warfare_II_key_art.jpg",
        title: "Call of Duty: Modern Warfare II",
        description: "The iconic shooter redefined.",
        price: 55
    }),
    new Product({
        imagePath: "https://image.api.playstation.com/cdn/UP0700/CUSA07408_00/Om74rfzTWW87AjHtdNyDrSYlYmya5IS6.png",
        title: "Horizon Zero Dawn",
        description: "Explore a lush world inhabited by massive robotic creatures.",
        price: 40
    })
];

let done = 0;

// Save each product to the database
for (let i = 0; i < products.length; i++) {
    products[i].save();
}

function exit() {
    mongoose.disconnect(() => {
        console.log('Database connection closed.');
    });
}
