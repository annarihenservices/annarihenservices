import React,{useEffect,useState} from 'react'
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import ServiceCardAdmin from './ServiceCardAdmin';
import { BsFillPlusSquareFill } from 'react-icons/bs'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Assurez-vous d'importer le style CSS
import useTranslate from "../../hooks/useTranslate.js";



export default function servicesAdmin() {
  const { t } = useTranslate();
  const navigate=useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchServices = async () => {
    try {
        setLoading(true);
        const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/annaservice/service/`);
        const json = await res.json();
        if (json.success === false) {
            setLoading(false);
        } else {
            setServices(json);
            setLoading(false);
        }
    } catch (error) {
        console.error(error);
        setLoading(false);
    }
};
useEffect(() => {
  fetchServices();
}, [services]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const paginate = (items) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : 1));
  };
  const handleServiceDelete = async(serviceId)=>{
    try {
        const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/annaservice/service/${serviceId}`, {
            method: 'DELETE',
        })
        const data = await res.json();

        //===checking reqest success or not ===//
        if (data.success === false) {
            //===showing error in tostify====//
            toast.error(data.message, {
                autoClose: 2000,
            })
        }
        else {
            navigate('/admin/services')
        }
    } catch (error) {
        toast.error(error.message, {
            autoClose: 2000,
        })
    }
}
  return (
    <div className=' pb-16'>
      <div className="grid  grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-6   pb-10  px-4  md:pt-5 ">
                    {/* ADD NEW Project BUTTON  */}
                    <div className="cursor-pointer rounded-md  bg-white  shadow-lg hover:shadow-xl">
                      <button
                        onClick={() => navigate("/createService")}
                        type="submit"
                        className=" px-5 bg-slate-300 font-heading rounded-xl shadow-lg text-green text-lg   hover:opacity-95 w-full h-full flex justify-center items-center flex-col py-10 sm:py-10"
                      >
                        <BsFillPlusSquareFill className="text-center md:mb-3 md:text-5xl text-green text-sm sm:text-xl rounded-xl" />
                        {t("create_service")}
                      </button>
                    </div>

                    {services &&
                      paginate(
                        services.map((service) => (
                          <ServiceCardAdmin
                            key={service._id}
                            serviceInfo={{ service, handleServiceDelete }}
                          />
                        ))
                      )}
                  </div>
                  <div className="flex justify-center mt-4">
                    <button
                      className="join-item btn bg-green text-white rounded-md mx-1 p-1 
                                                    disabled:bg-CustomWhite disabled:text-[#a0a0a0]
                                                    "
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                    >
                      <FaAngleDoubleLeft />
                    </button>
                    <button className="join-item btn bg-green  cursor-default text-white mx-1 rounded-md p-1">
                      {t("page")} {currentPage} /{" "}
                      {services.length % 7 == 0
                        ? Math.floor(services.length / 7)
                        : Math.floor(services.length / 7) + 1}
                    </button>
                    <button
                      className="join-item btn bg-green text-white rounded-md mx-1 p-1 
                      disabled:bg-CustomWhite disabled:text-[#a0a0a0]
                      "
                      onClick={handleNextPage}
                      disabled={
                        currentPage ===
                        Math.ceil(services.length / itemsPerPage)
                      }
                    >
                      <FaAngleDoubleRight />
                    </button>
                  </div>
    </div>
  )
}
