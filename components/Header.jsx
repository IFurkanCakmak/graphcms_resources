import React, {useState, useEffect} from "react";
import { getCategories } from '../services'
import Link from "next/link";
import Image from "next/image";


const Header = () => {
    const [navbar, setNavbar] = useState(false);
    const [categories, setCategories] = useState([]);
  
    useEffect(() =>{
      getCategories()
      .then((newCategories) => setCategories(newCategories))
    },[]);
  
  return (
    <div>
    
    <div className="container mx-auto px-6 mb-8">
    <div className="border-b w-full inline-block border-teal-400 py-8">
    <div className="md:float-left block">
        <div className="flex items-center -ml-6 lg:-ml-4 justify-between py-1 mt-2 lg:py-0 md:block">
            <Link href="/">
            <span className="cursor-pointer font-bold text-4xl text-white">
            <img className="h-14 inline "
            src="/logo.png"
            alt="izzet furkan cakmak"
            />
            </span>
        
            </Link>
              {/* HAMBURGER BUTTON FOR MOBILE */}
              <div className="md:hidden">
                <button
                  className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? (
                    <Image src="/close.png" width={30} height={30} alt="logo" />
                  ) : (
                    <Image
                      src="/hamburger-menu.png"
                      width={30}
                      height={30}
                      alt="logo"
                      className="focus:border-none active:border-none"
                    />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
            <div
              className={`flex-1 justify-self-center pb-3 mt-0 -mb-80 md:block md:pb-0 md:mt-0 ${
                navbar ? 'p-12 md:p-0 block' : 'hidden'
              }`}
            >
              <ul className="h-screen md:h-auto items-center md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer">
                
                {categories.map((category) =>(
                    <Link key={category.slug} href={`/category/${category.slug}`} onClick={() => setNavbar(!navbar)}>
                    <span className="md:float-right mt-5 align-middle text-white ml-4 font-semibold cursor-pointer">
                    <li className=" md:px-2 text-center border-b-2 md:border-b-0  hover:bg-teal-600  border-teal-600  md:hover:text-teal-600 md:hover:bg-transparent">
                    {category.name}
                    </li>
                    </span>
                      
                    
                    </Link>
                ))}
                
              </ul>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Header;

/* green line md:py- is set the distance to the posts in line 22 
cateogories bar distance by md:mt- set the category distance to the green line in line 59
distance between category names is set by the line 64 li class by md:px-2 
in mobile distance between menu and posts are set by -mb-80 in line 55
*/

/*sizing the line is px in line 18*/