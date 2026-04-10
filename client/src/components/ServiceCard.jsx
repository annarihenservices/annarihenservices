import React from 'react'
import { useNavigate } from 'react-router-dom'
import 'react-quill/dist/quill.snow.css';
import { useSelector, useDispatch } from "react-redux";


const ServiceCard = ({ service }) => {
    const dispatch = useDispatch();
    const currentLanguage = useSelector(
        (state) => state.language.currentLanguage
    );
    console.log(currentLanguage)
    const navigate = useNavigate();
    const { name, imgUrl, _id } = service;
    const displayName =
        currentLanguage === "ar" ? service.name_ar :
        currentLanguage === "en" ? service.name_eng :
        currentLanguage === "it" ? service.name_it :
        service.name;
    console.log(displayName)
    return (
        <div className="bg-transparant mb-5 rounded-lg  max-h-[300px] min-h-[150px] mx-2 group  my-1  shadow-lg shadow-gray-900 "
        onClick={() => navigate(`/service/${_id}`) }>
            <div className="card-container">
                <div className=" relative overflow-hidden  cursor-pointer items-center p-2"  >
                    <img
                        className='max-h-[200px] w-full object-cover rounded-lg hover:scale-105 duration-300 '
                        src={imgUrl[0]} alt="service image"
                    />
                </div>
                <div className="duration-500   ">
                    <div className=" p-3 pb-2 cursor-pointer">
                        <h2 className="text-md text-black font-inter font-extralight pb-4 ">
                            {displayName}
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ServiceCard