import React,{useState,useEffect} from 'react'
import ServiceCard from '../components/ServiceCard'
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import useTranslate from "../hooks/useTranslate";
export default function Services() {
  const { t } = useTranslate();
  const [services,setServices]=useState([]);
  const [loading, setLoading] = useState(false)
useEffect(() => {
  (async () => {
      try {
          const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/annaservice/service/`)
          const json = await res.json()
          if (json.success != false) {
            setServices(json)
            setLoading(false)          }
      } catch (error) {
          console.log(error);
      }
  })()
}, [services]) 
const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
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
  return (
    <div className='w-full  bg-white'>
      <div className='text-2xl text-black w-full text-center pb-10 font-inter font-extralight'>
        {t("explore_services")}
      </div>
      <div className='grid sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4'>
        {
          services && 
          paginate(
            services.map(service => <ServiceCard key={service._id} service={service} />))
        }
      </div>
      <div className="flex justify-center mt-4">
                    <button
                      className="join-item btn bg-red text-white rounded-md mx-1 p-1 
                                                    disabled:bg-CustomWhite disabled:text-[#a0a0a0]
                                                    "
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                    >
                      <FaAngleDoubleLeft />
                    </button>
                    <button className="join-item btn bg-red  cursor-default text-white mx-1 rounded-md p-1">
                      {t("page")} {currentPage} /{" "}
                      {services.length % 3 == 0
                        ? Math.floor(services.length / 3)
                        : Math.floor(services.length / 3) + 1}
                    </button>
                    <button
                      className="join-item btn bg-red text-white rounded-md mx-1 p-1 
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
