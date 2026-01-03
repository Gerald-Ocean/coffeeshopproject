import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed" style={{ backgroundImage: 'url(https://static.independent.co.uk/s3fs-public/thumbnails/image/2019/06/03/00/coffee-drink.jpg)' }}>
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-lg shadow-xl relative">
          <Link href="/" className="absolute top-4 right-4 text-black hover:text-gray-600 text-2xl font-bold">
            ×
          </Link>
          <h1 className="text-4xl font-bold text-black mb-8 border-b-2 border-coffee-200 pb-4">About Sarone Coffee</h1>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">Our History</h2>
              <p className="text-gray-700 leading-relaxed">
                Founded in 2010, Sarone started as a small cart on the corner of 5th Avenue. 
                Driven by a passion for the perfect roast, we have grown into a beloved community hub. 
                Our milestone was reached in 2015 when we opened our flagship store, serving over 
                1000 cups a day.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">Our Culture</h2>
              <p className="text-gray-700 leading-relaxed">
                We believe in "Coffee with a Conscience." Our workspace is inclusive, fast-paced, 
                and driven by creativity. We value sustainability, sourcing only fair-trade beans 
                and supporting local farmers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">The Team</h2>
              <p className="text-gray-700 leading-relaxed">
                Our baristas are artists. Each member undergoes rigorous training to master the art of brewing.
                Meet the faces behind your favorite cup on our Team page.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}