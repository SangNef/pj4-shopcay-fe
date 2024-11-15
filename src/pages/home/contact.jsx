import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., send form data to an API)
    alert('Your message has been sent!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <>
      <div className="bg-green-500 text-white text-center py-16">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold">Contact Us</h2>
          <p className="text-lg mt-2">We'd love to hear from you!</p>
        </div>
      </div>

      <div className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="lg:col-span-1">
              <h4 className="text-2xl font-semibold">Get in Touch</h4>
              <p className="mt-4 text-lg">
                Whether you have a question about our products or need assistance, we're here to help. Feel free to reach out to us using the contact form or through our social media channels.
              </p>

              <div className="mt-8">
                <p><strong>Address:</strong> 123 Green Garden, City, Country</p>
                <p><strong>Phone:</strong> +123 456 7890</p>
                <p><strong>Email:</strong> contact@plantshop.com</p>
              </div>

              <ul className="mt-6 flex space-x-6">
                <li><a href="#" className="text-blue-600 hover:text-blue-800"><i className="fa fa-facebook"></i></a></li>
                <li><a href="#" className="text-blue-400 hover:text-blue-600"><i className="fa fa-twitter"></i></a></li>
                <li><a href="#" className="text-pink-500 hover:text-pink-700"><i className="fa fa-instagram"></i></a></li>
                <li><a href="#" className="text-red-600 hover:text-red-800"><i className="fa fa-pinterest"></i></a></li>
              </ul>
            </div>

            <div className="lg:col-span-1">
              <h4 className="text-2xl font-semibold">Send Us a Message</h4>
              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-lg font-medium">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-lg font-medium">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block text-lg font-medium">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 mt-4 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-semibold">Find Us on the Map</h2>
          <p className="mt-2 text-lg">We are located in the heart of the city, and we are happy to welcome you.</p>

          <div className="mt-8">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3038.01729017334!2d-74.005941!3d40.712776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDPCsDU5JzAwLjAiTiA3NMKwMDAnNTIuMiJX!5e0!3m2!1sen!2sus!4v1635171371655!5m2!1sen!2sus"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
