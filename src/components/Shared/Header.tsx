import { useState } from 'react'
import { ModeToggle } from '@/Modules/Theme/Views'
import { NavHeaderArray } from "../../Data/data"
import { Link, useNavigate } from '@tanstack/react-router'
import { Menu, X , ShoppingCart} from 'lucide-react'
import { Button } from '../ui/button'
import { ProfileDropDown } from './ProfileDropDown'
import lightLogo from "../../../public/lightLogo.jpeg"
import DarkLogo from "../../../public/DarkLogo.jpeg"
import { useTheme } from '@/Modules/Theme'
import { useGetCurrentUser } from '@/Utils/useGetDataForCurrentUser'


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate=useNavigate();
  const {theme}=useTheme();
  const {data,isLoading} =useGetCurrentUser();
 

  return (
    <header className='sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          
          <div className='flex-shrink-0'>
            <Link  to='/' className='text-xl font-bold text-foreground'>
       {/* <Store className='w-24 h-10' /> */}
       <img src={theme=== "light" ? lightLogo : DarkLogo} alt="logo"  className='w-12 h-12 rounded-full'/>
            </Link>
          </div>

          <nav className='hidden md:flex items-center space-x-8'>
            <ul className='flex space-x-8'>
              {NavHeaderArray.map(({ href, title, Icon }, index) => (
                <li key={index}>
                  <Link
                    to={href}
                    className='flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors duration-200'
                  >
                    <Icon className='w-4 h-4' />
                    <span>{title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className='flex items-center space-x-4'>
            <div>
            <ShoppingCart/>
            </div>
            <ModeToggle />
            {!isLoading && data ?<>
            <ProfileDropDown/>
            
            </> : <div className='flex space-x-4'>
            <Button variant={"outline"}  onClick={()=>{navigate({to:"/login"})}}>log in</Button>
            <Button variant={"default"} onClick={()=>{navigate({to:"/register"})}}>Sign up</Button>
            </div>}
            
            {/* Mobile menu Button */}
            <Button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className='md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent focus:outline-none'
            >
              {isMenuOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className='md:hidden py-4 border-t border-border'>
            <ul className='flex flex-col space-y-3'>
              {NavHeaderArray.map(({ href, title, Icon }, index) => (
                <li key={index}>
                  <Link 
                    to={href}
                    onClick={() => setIsMenuOpen(false)}
                    className='flex items-center space-x-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors duration-200'
                  >
                    <Icon className='w-5 h-5' />
                    <span>{title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header