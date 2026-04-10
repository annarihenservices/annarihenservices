import React from 'react'
import logo from '../../assets/logo.png'
import pub from '../../assets/pub.png'
import a1 from '../../assets/a1.jpg'
import a2 from '../../assets/a2.jpg'
import b1 from '../../assets/b1.jpg'
import b2 from '../../assets/b2.jpg'
import flag from '../../assets/flag.png'
import useTranslate from "../../hooks/useTranslate";

export default function HomeCourses() {
  const { t } = useTranslate();
  return (
    <div className='py-14 lg:grid lg:grid-cols-5 w-full items-center justify-center text-center bg-white '>
      <div className='col-span-3 text-sm font-inter font-extralight text-left px-10 relative '>
        <img
            src={flag}
            className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
            max-h-[400px] opacity-30 w-full object-cover z-0'
          />
        
        <h1 className='text-3xl font-bold font-inter relative z-10'>
            {t("cours_italien")}
        </h1>
        <br/>
        <p className='relative z-10'>
           {t("home_courses_p1")}
           <br/><br/>
            {t("home_courses_p2")}
           <br/><br/>
           {t("home_courses_p3")}
                    </p>

        </div>
      <div className='col-span-2 text-center pb-6 lg:pb-0 grid grid-cols-2'>
        <div className="col-span-1 bg-transparant mb-5 rounded-lg  max-h-[300px] min-h-[150px] mx-2 group  my-1  shadow-lg shadow-gray-900 ">
            <div className="card-container">
                <div className=" relative overflow-hidden  cursor-pointer items-center p-2"  >
                    <img
                        className='max-h-[140px] w-full object-cover rounded-lg hover:scale-105 duration-300 '
                        src={a1} alt="service image"
                    />
                </div>
                <div className="duration-500   ">
                    <div className=" p-3 pb-2 cursor-pointer">
                        <h2 className="text-md  text-black font-inter font-extralight pb-4 ">
                            {t("home_level1")}
                        </h2>
                    </div>
                </div>
            </div>
        </div>

        <div className="col-span-1 bg-transparant mb-5 rounded-lg  max-h-[300px] min-h-[150px] mx-2 group  my-1  shadow-lg shadow-gray-900 ">
            <div className="card-container">
                <div className=" relative overflow-hidden  cursor-pointer items-center p-2"  >
                    <img
                        className='max-h-[140px] w-full object-cover rounded-lg hover:scale-105 duration-300 '
                        src={a2} alt="service image"
                    />
                </div>
                <div className="duration-500   ">
                    <div className=" p-3 pb-2 cursor-pointer">
                        <h2 className="text-md text-black font-inter font-extralight pb-4 ">
                            {t("home_level2")}
                        </h2>
                    </div>
                </div>
            </div>
        </div>

        <div className="col-span-1 bg-transparant mb-5 rounded-lg  max-h-[300px] min-h-[150px] mx-2 group  my-1  shadow-lg shadow-gray-900 ">
            <div className="card-container">
                <div className=" relative overflow-hidden  cursor-pointer items-center p-2"  >
                    <img
                        className='max-h-[140px] w-full object-cover rounded-lg hover:scale-105 duration-300 '
                        src={b1} alt="service image"
                    />
                </div>
                <div className="duration-500   ">
                    <div className=" p-3 pb-2 cursor-pointer">
                        <h2 className="text-md text-black font-inter font-extralight pb-4 ">
                            {t("home_level3")}
                        </h2>
                    </div>
                </div>
            </div>
        </div>

        <div className="col-span-1 bg-transparant mb-5 rounded-lg  max-h-[300px] min-h-[150px] mx-2 group  my-1  shadow-lg shadow-gray-900 ">
            <div className="card-container">
                <div className=" relative overflow-hidden  cursor-pointer items-center p-2"  >
                    <img
                        className='max-h-[140px] w-full object-cover rounded-lg hover:scale-105 duration-300 '
                        src={b2} alt="service image"
                    />
                </div>
                <div className="duration-500   ">
                    <div className=" p-3 pb-2 cursor-pointer">
                        <h2 className="text-md text-black font-inter font-extralight pb-4 ">
                            {t("home_level4")}
                        </h2>
                    </div>
                </div>
            </div>
        </div>
      </div>
  
    </div>
  )
}
