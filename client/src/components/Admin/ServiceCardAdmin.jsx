import React from 'react';
import { FaBath, FaCamera, FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import useTranslate from "../../hooks/useTranslate";

export default function ServiceCardAdmin({serviceInfo}) {
    const { t } = useTranslate();
  
    if (!serviceInfo || !serviceInfo.service) {
        return <div>Project data is missing</div>; 
      }
      
      const {
        imgUrl,
        name,
        _id,
      } = serviceInfo.service;
      const navigate = useNavigate();
      const dispatch = useDispatch();
          const currentLanguage = useSelector(
              (state) => state.language.currentLanguage
          );
          console.log(currentLanguage)
          const displayName =
              currentLanguage === "ar" ? serviceInfo.service.name_ar :
              currentLanguage === "en" ? serviceInfo.service.name_eng :
              currentLanguage === "it" ? serviceInfo.service.name_it :
              serviceInfo.service.name;
          console.log(displayName)

  return (
    <div className="rounded-md  shadow-lg hover:shadow-xl">
      <div
        onClick={() => navigate(`/service/${_id}`)}
        className="relative flex items-end overflow-hidden rounded-md h-[200px] cursor-pointer"
      >
        <img
          className="hover:scale-105 object-cover h-full w-full duration-300"
          src={imgUrl[0]}
          alt="wallpaper"
        />
        <div className="absolute bottom-3 right-3 inline-flex items-center rounded-sm px-2 py-1">
          <span className="text-xs text-white uppercase font-heading flex items-center">
            <FaCamera className="mr-1" />
            {imgUrl.length}
          </span>
        </div>
      </div>
      <div className="p-4">
        <div onClick={() => navigate(`/service/${_id}`)} className="cursor-pointer">
          <h2 className="text-gray-900 font-heading text-xl truncate cursor-pointer">{displayName}</h2>
          <p className="mt-2 text-sm text-gray-900 font-content font-bold truncate">
          </p>
        </div>
        <div className="mt-4 flex items-end justify-between space-x-1">
          <button
            onClick={() => navigate(`/updateService/${_id}`)}
            className="bg-red hover:bg-green rounded-lg py-2 px-7 font-heading text-white bg-green hover:opacity-95 text-sm"
          >
            {t("modifier_test")}
          </button>
          <button
            onClick={() => serviceInfo.handleServiceDelete(_id)}
            className="bg-green hover:bg-red py-2 px-5 rounded-lg font-heading text-white bg-black hover:opacity-95 text-sm z-10"
          >
            {t("supprimer_test")}
          </button>
        </div>
      </div>
    </div>
  )
}
