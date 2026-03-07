import { Link } from '@tanstack/react-router'
import {  Github, Linkedin, Heart, Mail, Phone, MapPin, BookUser } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className='border-t border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12'>
        
        {/* Main Footer Content */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12'>
          
          {/* Company Info */}
          <div className='space-y-3'>
            <h3 className='text-lg font-semibold text-gray-800 dark:text-gray-200'>Company</h3>
            <p className='text-sm text-gray-600 dark:text-gray-400'>
              Building amazing web experiences with modern technologies.
            </p>
            <div className='flex space-x-4 pt-2'>
            
              <a href="https://github.com/momen-x" target='_blank' className='text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors'>
                <Github className='w-5 h-5' />
              </a>
              <a href="https://www.linkedin.com/in/mo%E2%80%99men-alswafiri-8b6491346" target='_blank' className='text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors'>
                <Linkedin className='w-5 h-5' />
              </a>
              <a href="mailto:moamenalswafiri@gmail.com" target='_blank' className='text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors'>
                <Mail className='w-5 h-5' />
              </a>
              <a href="https://wa.me/+972598817322" target='_blank' className='text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors'>
               <BookUser className='w-5 h-5'/>
              </a>
            </div>
          </div>
          {/* Contact Info */}
          <div className='space-y-3'>
            <h3 className='text-lg font-semibold text-gray-800 dark:text-gray-200'>Contact</h3>
            <ul className='space-y-3'>
              <li className='flex items-start space-x-3 text-sm text-gray-600 dark:text-gray-400'>
                <MapPin className='w-4 h-4 mt-0.5 flex-shrink-0' />
                <span>123 Business Ave, Suite 100<br />San Francisco, CA 94107</span>
              </li>
              <li className='flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400'>
                <Phone className='w-4 h-4 flex-shrink-0' />
                <span>+970598817322</span>
              </li>
              <li className='flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400'>
                <Mail className='w-4 h-4 flex-shrink-0' />
                <span>moamenalswafiri@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className='space-y-3'>
            <h3 className='text-lg font-semibold text-gray-800 dark:text-gray-200'>Newsletter</h3>
            <p className='text-sm text-gray-600 dark:text-gray-400'>
              Subscribe to get updates about new products and features.
            </p>
          
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='mt-8 pt-8 border-t border-gray-200 dark:border-gray-800'>
          <div className='flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0'>
            <p className='text-sm text-gray-600 dark:text-gray-400'>
              © {currentYear} Your Company. All rights reserved.
            </p>
            <div className='flex items-center space-x-4 text-sm'>
              <Link to="/" className='text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-colors'>
                Privacy Policy
              </Link>
              <span className='text-gray-400 dark:text-gray-600'>•</span>
              <Link to="/" className='text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-colors'>
                Terms of Service
              </Link>
              <span className='text-gray-400 dark:text-gray-600'>•</span>
              <Link to="/" className='text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-colors flex items-center space-x-1'>
                <span>Made with Mo'men</span>
                <Heart className='w-4 h-4 text-red-500 fill-current' />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer