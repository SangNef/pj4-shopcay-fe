import React from 'react';

const About = () => {
  return (
    <>
      {/* Page Heading */}
      <div className="bg-green-500 text-white py-16" id="top">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold">About Our Plant Shop</h2>
          <span className="text-lg mt-4">Bringing nature to your home, one plant at a time.</span>
        </div>
      </div>

      {/* About Us Section */}
      <div className="py-16">
        <div className="container mx-auto flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2">
            <img src="assets/23.png" alt="About Us" className="w-full h-auto rounded-lg" />
          </div>
          <div className="lg:w-1/2 mt-8 lg:mt-0 lg:pl-16">
            <h4 className="text-2xl font-semibold mb-4">About Us & Our Mission</h4>
            <p className="text-lg mb-4">
              We are passionate about helping you create your perfect indoor garden. From exotic plants to succulents, we offer a wide variety of plants for every home.
            </p>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-4">
              <i className="fa fa-quote-left text-green-500 text-xl mb-2" />
              <p className="italic text-lg">
                "A plant in your home is a step towards a greener, healthier life."
              </p>
            </div>
            <p className="text-lg">
              Our team of plant experts is here to guide you in selecting the best plants for your environment and giving you tips for plant care. Join our community of plant lovers and start growing today!
            </p>
            <ul className="flex space-x-4 mt-6">
              <li>
                <a href="#" className="text-green-500 hover:text-green-700">
                  <i className="fa fa-facebook text-2xl" />
                </a>
              </li>
              <li>
                <a href="#" className="text-green-500 hover:text-green-700">
                  <i className="fa fa-twitter text-2xl" />
                </a>
              </li>
              <li>
                <a href="#" className="text-green-500 hover:text-green-700">
                  <i className="fa fa-instagram text-2xl" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Our Team Section */}
      {/* <section className="bg-gray-50 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-lg mb-8">The passionate people behind your perfect plants.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <img src="assets/images/team-member-01.jpg" alt="Team Member" className="w-32 h-32 mx-auto rounded-full mb-4" />
              <h4 className="text-xl font-semibold">Jane Doe</h4>
              <span className="text-gray-500">Plant Expert</span>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <img src="assets/images/team-member-02.jpg" alt="Team Member" className="w-32 h-32 mx-auto rounded-full mb-4" />
              <h4 className="text-xl font-semibold">John Smith</h4>
              <span className="text-gray-500">Customer Support</span>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <img src="assets/images/team-member-03.jpg" alt="Team Member" className="w-32 h-32 mx-auto rounded-full mb-4" />
              <h4 className="text-xl font-semibold">Alex Brown</h4>
              <span className="text-gray-500">Logistics Manager</span>
            </div>
          </div>
        </div>
      </section> */}

      {/* Our Services Section */}
      <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Our Services</h2>
          <p className="text-lg mb-8">We offer a variety of services to make your plant journey easier and more enjoyable.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h4 className="text-xl font-semibold mb-4">Plant Delivery</h4>
              <p>Get your favorite plants delivered straight to your doorstep, with care instructions included.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h4 className="text-xl font-semibold mb-4">Plant Care Tips</h4>
              <p>Our experts share plant care tips to keep your plants healthy and thriving.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h4 className="text-xl font-semibold mb-4">Custom Plant Selection</h4>
              <p>Not sure which plants to choose? Let us help you select the best plants for your home.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
