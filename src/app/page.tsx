import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-beige">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2071&auto=format&fit=crop')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white p-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg">Savor the Perfect Brew!</h1>
          <p className="text-xl md:text-2xl mb-8 font-light italic">"Authentic coffee from the finest beans."</p>
          <Link href="/menu" className="bg-coffee-500 hover:bg-coffee-600 text-white py-3 px-8 rounded-full text-lg font-semibold transition">
            Order Now
          </Link>
        </div>
      </section>

      {/* Featured / Why Choose Us */}
      <section className="py-16 container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <h4 className="text-coffee-600 font-bold uppercase tracking-widest mb-2">Featured</h4>
            <h2 className="text-4xl font-bold text-coffee-900 mb-6">Why Choose Us?</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              We source the finest beans from sustainable farms across the globe. Our roasting process 
              highlights the unique notes of each origin, delivering a cup that is rich, aromatic, 
              and unforgettable. Experience the Sarone difference today.
            </p>
            <Link href="/about" className="bg-coffee-800 text-white px-6 py-2 rounded hover:bg-coffee-700 transition">
              Read Our Story
            </Link>
          </div>
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop" 
              alt="Coffee Art" 
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </section>


      <section className="bg-coffee-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-coffee-900 mb-12">What Our Customers Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border border-coffee-200">
              <p className="italic text-gray-600 mb-4">"The best espresso I've had in years. The atmosphere is perfect for working or relaxing."</p>
              <h5 className="font-bold text-black">- Sarah Johnson</h5>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-coffee-200">
              <p className="italic text-gray-600 mb-4">"Amazing latte art and the cold brew is absolutely incredible. This place has become my daily ritual!"</p>
              <h5 className="font-bold text-black">- Michael Chen</h5>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-coffee-200">
              <p className="italic text-gray-600 mb-4">"Friendly staff, cozy environment, and the cappuccino is to die for. Highly recommend to all coffee lovers!"</p>
              <h5 className="font-bold text-black">- Emma Rodriguez</h5>
            </div>
          </div>
        </div>
      </section>

      {/* Happy Hours Banner (Bottom like reference) */}
      <section className="bg-coffee-400 py-12 text-coffee-900">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0">
            <h2 className="text-3xl font-bold text-white mb-2">Morning Happy Hours</h2>
            <p className="text-white/90">Get 50% off on all pastries every morning from 7 AM - 9 AM.</p>
          </div>
          <div className="flex gap-4">
             <img src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=200&h=200&fit=crop" className="rounded-full w-24 h-24 border-4 border-white object-cover" />
             <img src="https://images.unsplash.com/photo-1511920170033-f8396924c348?w=200&h=200&fit=crop" className="rounded-full w-24 h-24 border-4 border-white object-cover" />
          </div>
        </div>
      </section>
    </main>
  );
}