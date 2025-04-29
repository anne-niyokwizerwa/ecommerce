
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-brand-blue text-white py-20">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">About TechEdge</h1>
              <p className="text-xl text-gray-200">
                Premium tech accessories for the modern professional
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Our Story</h2>
                <p className="text-gray-700 mb-4">
                  TechEdge was founded in 2020 with a simple mission: to create premium tech accessories that enhance the modern lifestyle without compromising on quality or design.
                </p>
                <p className="text-gray-700 mb-4">
                  As the founder and sole developer, I (Anne Niyokwizerwa) set out to create products that were both functional and beautiful. After months of research and development, TechEdge was born.
                </p>
                <p className="text-gray-700">
                  Today, I'm proud to offer a curated collection of high-quality tech accessories that help customers elevate their everyday tech experience. From premium charging solutions to elegant stands and holders, every product is designed with purpose and crafted with care.
                </p>
              </div>
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
                  alt="Our Story"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-brand-teal rounded-full flex items-center justify-center text-white mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">Innovation</h3>
                <p className="text-gray-600 text-center">
                  I'm constantly pushing the boundaries of what tech accessories can be, finding new ways to enhance the user experience through thoughtful design and cutting-edge technology.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-brand-teal rounded-full flex items-center justify-center text-white mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">Quality</h3>
                <p className="text-gray-600 text-center">
                  I believe in creating products that last. From the materials I source to my rigorous testing process, quality is at the heart of everything I do.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-brand-teal rounded-full flex items-center justify-center text-white mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">Sustainability</h3>
                <p className="text-gray-600 text-center">
                  I'm committed to reducing our environmental footprint through eco-friendly packaging, sustainable materials, and responsible manufacturing processes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Developer Section */}
        <section className="py-16">
          <div className="container-custom">
            <h2 className="text-3xl font-bold mb-8 text-center">Meet the Developer</h2>
            <div className="max-w-2xl mx-auto text-center">
              <div className="rounded-full overflow-hidden w-40 h-40 mx-auto mb-6">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
                  alt="Anne Niyokwizerwa"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-semibold mb-2">Anne Niyokwizerwa</h3>
              <p className="text-brand-teal text-lg mb-4">Founder & Developer</p>
              <p className="text-gray-700 mb-6">
                With a passion for both technology and design, I created TechEdge to bring beautiful, functional tech accessories to customers worldwide. Every aspect of this platform—from product design to web development—reflects my commitment to quality and user experience.
              </p>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-brand-blue text-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
              <p className="text-xl mb-8 text-gray-200">
                Have questions about our products or company? I'd love to hear from you!
              </p>
              <a
                href="mailto:hello@techedge.com"
                className="inline-block bg-brand-teal hover:bg-opacity-90 text-white py-3 px-8 rounded-md font-medium transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
