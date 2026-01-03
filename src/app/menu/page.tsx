import React from 'react';

const menuItems = [
  { name: "Espresso", price: "$3.50", desc: "Strong, concentrated coffee.", img: "https://www.thespruceeats.com/thmb/HJrjMfXdLGHbgMhnM0fMkDx9XPQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/what-is-espresso-765702-hero-03_cropped-ffbc0c7cf45a46ff846843040c8f370c.jpg" },
  { name: "Latte", price: "$4.50", desc: "Espresso with steamed milk.", img: "https://assets.tmecosys.com/image/upload/t_web_rdp_recipe_584x480_1_5x/img/recipe/ras/Assets/314D11A6-4457-4C70-A1BE-A6C25F597C18/Derivates/B362DC69-6AAA-43E1-AF51-184463E8551B.jpg" },
  { name: "Cold Brew", price: "$5.00", desc: "Steeped for 12 hours.", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2sRA-TCn7N3KTK-9YlxPrmuI2QFmQSVdfqQ&s" },
  { name: "Cappuccino", price: "$4.00", desc: "Espresso, steamed milk, and foam.", img: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=500" },
];

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-beige py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-coffee-800 mb-4">Our Menu</h1>
        <p className="text-center text-white-600 mb-12 max-w-2xl mx-auto">Explore our range of premium coffee blends and hand-crafted beverages.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {menuItems.map((item) => (
            <div key={item.name} className=" rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300">
              <div className="h-48 relative">
                <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-coffee-800">{item.name}</h3>
                <p className="text-coffee-600 font-bold my-2">{item.price}</p>
                <p className="text-gray-500 text-sm mb-4">{item.desc}</p>
                <button className="bg-white text-black px-6 py-4 rounded-lg text-lg font-bold border-2 border-coffee-800 hover:bg-gray-100 w-full shadow-md">Order Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}