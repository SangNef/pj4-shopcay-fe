import React from 'react'

const Footer = () => {
  return (
    <div className='bg-green-900 w-full py-8'>
        <div className="max-w-[1120px] mx-auto mt-10 flex justify-between items-start gap-8">
            <div>
                <h1 className="text-2xl font-bold text-white">Logo</h1>
                <p className="text-white mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
            <div>
                <h1 className="text-xl font-bold text-white">Quick Links</h1>
                <ul className="mt-4">
                    <li>
                        <a href="#" className="text-white block hover:text-green-500">Home</a>
                    </li>
                    <li>
                        <a href="#" className="text-white block hover:text-green-500">About</a>
                    </li>
                    <li>
                        <a href="#" className="text-white block hover:text-green-500">Services</a>
                    </li>
                    <li>
                        <a href="#" className="text-white block hover:text-green-500">Contact</a>
                    </li>
                </ul>
            </div>
            <div>
                <h1 className="text-xl font-bold text-white">Contact Us</h1>
                <p className="text-white mt-4">123, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod.</p>
                <p className="text-white mt-2">Email: ep4apteach@gmail.com</p>
                <p className="text-white mt-2">Phone: +91 1234567890</p>
            </div>
        </div>
    </div>
  )
}

export default Footer