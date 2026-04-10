import { NavLink, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Hamburger from '../assets/hamburger.svg';
import Close from '../assets/x.svg';
import logo from '../assets/logo.png';
import { useSelector, useDispatch } from "react-redux";
import { changeLanguage } from "../redux/language/languageSlice";
import fr from '../assets/fr.jpg'
import en from '../assets/en.jpg'
import ar from '../assets/ar.jpg'
import it from '../assets/it.jpg'
import useTranslate from "../hooks/useTranslate";



export default function NavbarComp() {
  const [toggle, setToggle] = useState(false);


const dispatch = useDispatch();
  const currentLanguage = useSelector(
    (state) => state.language.currentLanguage
  );

  const [open, setOpen] = useState(false);

  const { t } = useTranslate();

  const languages = [
  { code: "fr", name: "Français", flag: fr },
  { code: "it", name: "Italiano", flag: it },
  { code: "en", name: "English", flag: en },
  { code: "ar", name: "العربية", flag: ar },
];

  const current = languages.find((l) => l.code === currentLanguage);
  const handleToggle = () => {
    setToggle(!toggle);
  };

  console.log(currentLanguage)

  return (
    <div className="relative z-50">
            <div className="hidden shadow-lg rounded-b-2xl lg:grid px-5 py-3 items-center  grid-cols-10 ">
              <div className="col-span-1 items-center my-auto">
                  <a href="/">
                    <img src={logo} className="max-w-[70px]  my-auto "/>
                  </a>
              </div>
              <div className="col-span-5 items-center flex justify-between font-inter font-extralight text-sm ml-10">
                <div><a className='hover:text-green' href="/">{t("Accueil")}</a></div>
                <div><a className='hover:text-green' href="/services">{t("Services")}</a></div>
                <div><a className='hover:text-green' href="/languagecourses">{t("Cours_de_Langue")}</a></div>
                <div><a className='hover:text-green' href="/contact">{t("Contact")}</a></div>
              </div>
              <div className="col-span-2"></div>
              <div className="col-span-1">
                <a href='/Consultation'className="bg-red cursor-pointer text-white text-xs font-inter font-extralight p-2 rounded-2xl mx-auto my-auto hover:bg-green">
                {t("Consultation")}
                </a>
              </div>
              <div className="col-span-1 text-center items-center">





                <div className="relative inline-block bg-red cursor-pointer text-white text-xs font-inter font-extralight p-2 rounded-2xl mx-auto my-auto hover:bg-green">
      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 w-full "
      >
        <span className="">
          <img src={current.flag} className="my-auto w-6"/>
        </span>
        <span className="font-inter">{current.name}</span>
      </button>



      {/* Dropdown */}
      {open && (
        <div className="absolute mt-4 right-0 w-24 bg-white border rounded-lg shadow-lg text-black">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                dispatch(changeLanguage(lang.code));
                setOpen(false);
              }}
              className="flex items-center gap-1 w-full px-2 py-1 hover:bg-gray-100"
            >
              <span className="">
                <img src={lang.flag} className="my-auto w-6"/>
                </span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>














              </div>
            </div>
            <div className="hidden sm:grid lg:hidden pl-5 py-3 items-center grid-cols-12">
                <div className="col-span-1 items-center my-auto">
                  <a href="/">
                    <img src={logo} className="max-w-[70px]  my-auto"/>
                  </a>
                </div>
                <div className="col-span-6">

                </div>
                <div className="col-span-2">
                <a href='/Consultation'className="bg-red cursor-pointer text-white text-xs font-inter font-extralight p-2 rounded-2xl mx-auto my-auto hover:bg-green">
                {t("Consultation")}
                </a>
              </div>
              <div className="col-span-2 text-center items-center">
                <div className="relative inline-block bg-red cursor-pointer text-white text-xs font-inter font-extralight p-2 rounded-2xl mx-auto my-auto hover:bg-green">
      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 w-full "
      >
        <span className="">
          <img src={current.flag} className="my-auto w-6"/>
        </span>
        <span className="font-inter">{current.name}</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute mt-4 right-0 w-24 bg-white border rounded-lg shadow-lg text-black">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                dispatch(changeLanguage(lang.code));
                setOpen(false);
              }}
              className="flex items-center gap-1 w-full px-2 py-1 hover:bg-gray-100"
            >
              <span className="">
                <img src={lang.flag} className="my-auto w-6"/>
                </span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
              </div>
                <div className="col-span-1 text-center">
                <button
                      className="text-center"
                      onClick={handleToggle}
                    >
                      <img src={toggle ? Close : Hamburger} alt="menu" className="h-12 w-12 text-black " />
                    </button>
                </div>
            </div>

            <div className="grid sm:hidden pl-5 py-3 items-center grid-cols-12">
                <div className="col-span-2 items-center my-auto">
                  <a href="/">
                    <img src={logo} className="max-w-[70px]  my-auto"/>
                  </a>
                </div>
                <div className="col-span-2">

                </div>
                <div className="col-span-3">
                <a href='/Consultation'className="bg-red cursor-pointer text-white text-xs font-inter font-extralight p-2 rounded-2xl mx-auto my-auto hover:bg-green">
                {t("Consultation")}
                </a>
              </div>
              <div className="col-span-3 text-center items-center">
                <div className="relative inline-block bg-red cursor-pointer text-white text-xs font-inter font-extralight p-2 rounded-2xl mx-auto my-auto hover:bg-green">
      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 w-full "
      >
        <span className="">
          <img src={current.flag} className="my-auto w-6"/>
        </span>
        <span className="font-inter">{current.name}</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute mt-4 right-0 w-24 bg-white border rounded-lg shadow-lg text-black">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                dispatch(changeLanguage(lang.code));
                setOpen(false);
              }}
              className="flex items-center gap-1 w-full px-2 py-1 hover:bg-gray-100"
            >
              <span className="">
                <img src={lang.flag} className="my-auto w-6"/>
                </span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
              </div>
                <div className="col-span-2 text-center">
                    <button
                      className="text-right"
                      onClick={handleToggle}
                    >
                      <img src={toggle ? Close : Hamburger} alt="menu" className="h-12 w-12 text-black " />
                    </button>
                </div>
            </div>
            <button onClick={handleToggle}>
            <div className={` bg-overlay-gray w-full h-full fixed top-0 right-0 left-0 ${toggle?"block":"hidden"}`}></div>
            </button>

              <div className={`text-sm py-2 font-inter font-sans font-extralight space-y-2 lg:hidden  fixed z-50 text-left pl-10 w-[80%] mx-[10%] bg-white shadow-lg rounded-lg ${toggle? "block":"hidden"} `}>
                <div><a className='hover:text-green' href="/">{t("Accueil")}</a></div>
                <div><a className='hover:text-green' href="/services">{t("Services")}</a></div>
                <div><a className='hover:text-green' href="/languagecourses">{t("Cours_de_Langue")}</a></div>
                <div><a className='hover:text-green' href="/contact">{t("Contact")}</a></div>
            </div>
    </div>
    
  );
}
