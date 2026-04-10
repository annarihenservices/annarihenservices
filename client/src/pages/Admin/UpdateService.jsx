import  { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import useTranslate from "../../hooks/useTranslate";
import axios from 'axios';
const UpdateService = () => {
    const { t } = useTranslate();
    
    const [content, setContent] = useState('');
    const [content_eng, setContent_eng] = useState('');
    const [content_it, setContent_it] = useState('');
    const [content_ar, setContent_ar] = useState('');
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    const { currentAdmin } = useSelector(state => state.admin)
    const [imageFile, setImageFile] = useState([]);
    const [uploadError, setUploadError] = useState({
        isError: false,
        message: ''
    });
    const [formSubmitLoading, setFormSubmitLoading] = useState(false)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        imgUrl: [],
    })
    const [dataLoading, setDataLoading] = useState(false);
    const navigate = useNavigate()
    const params = useParams()

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        mode: "onChange"
    });

    //===Load Post informations here===//
    useEffect(() => {

        document.getElementById("admin").hidden=true;
        if(currentAdmin.role==="admin"){
            document.getElementById("admin").hidden=false;
        }
        const getProjectInfo = async () => {
            setDataLoading(true)
            const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/annaservice/service/${params.id}`)
            const data = await res.json();
            if (data.success === false) {
                toast.error(data.message, {
                    autoClose: 2000,
                })
            }
            else {
                setFeildValue(data)
                setFormData({ ...formData, imgUrl: data.imgUrl });
            }
        }
        getProjectInfo()
    }, [])
    const setFeildValue = (data) => {
        setValue('name', data.name);
        setValue('name_eng', data.name_eng);
        setValue('name_it', data.name_it);
        setValue('name_ar', data.name_ar);
        setContent(data.description) ;
        setContent_eng(data.description_eng) ;
        setContent_it(data.description_it) ;
        setContent_ar(data.description_ar) ;
        
    }

    const cloud_name="dbeqyl7n6";
    const preset_key="ml_default"
    const handleImageUpload = async () => {
        if (imageFile.length > 0 && imageFile.length + formData.imgUrl.length < 13) {
            setLoading(true)
            const promises = [];
            for (let i = 0; i < imageFile.length; i++) {
                const formdata = new FormData();
                formdata.append("file",imageFile[i]);
                formdata.append('upload_preset',preset_key);
                axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,formdata)
                .then(res=>{
                    setFormData({ ...formData, imgUrl: formData.imgUrl.concat(res.data.secure_url) })
                    setLoading(false)
                })
                .catch(err=>{
                    setUploadError({ ...uploadError, isError: true, message: error })
                    setLoading(false)
                })
            }
        }
        else {
            setUploadError({ ...uploadError, isError: true, message: 'Select file first (max:12)' })
            setLoading(false)
        }

    }
    

    const handleDelete = (index) => {
        setFormData({ ...formData, imgUrl: formData.imgUrl.filter((items) => items != formData.imgUrl[index]) })
    }

    uploadError.isError && toast.error(uploadError.message, {
        autoClose: 2000,
    })


    const handleFormSubmit = async (data) => {
        try {
            setFormSubmitLoading(true)
            const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/annaservice/service/${params.id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({
                    ...data,
                    description:content,
                    description_eng:content_eng,
                    description_it:content_it,
                    description_ar:content_ar,
                    imgUrl: formData.imgUrl,
                    userRef: currentAdmin._id
                })
            })
            const serverRes = await res.json();
            if (serverRes.success === false) {
                toast.error(serverRes.message, {
                    autoClose: 2000,
                })
                setFormSubmitLoading(false)
            }
            else {
                navigate(`/service/${serverRes._id}`)
                setFormSubmitLoading(false)
            }

        } catch (error) {
            toast.error(error.message, {
                autoClose: 2000,
            })
            setFormSubmitLoading(false)
        }
    }
    const modules = {
        toolbar: [
          [{ 'font': [] }, { 'size': [] }],
          ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'align': [] }],
          ['link', 'image'],
        ],
      };

      const formats = [
        'font', 'size', 'bold', 'italic', 'underline', 'strike',
        'list', 'bullet', 'align', 'link', 'image'
      ];




    return (
        <main>
                    <section id='admin' className=' text-center px-5'>
                        <div className="container py-7 md:py-16 max-w-5xl text-center mx-auto">
                            <h1 className='text-center text-2xl font-heading font-bold text-black'>{t("update_service")}</h1>
                            <div className="mt-8 form_container">
                                <form onSubmit={handleSubmit(handleFormSubmit)}>
                                    <div className='feilds_container grid gap-5 md:gap-10  grid-col-1 md:grid-cols-2 items-start  '>



                                        {/* ====== Form Sections Start Form Here ===== */}
                                        <div className="info_container text-left">
                                            <div>
                                                                                    <div>Nom</div>
                                                                                    <div className="input_feilds">
                                            
                                                                                        <input
                                                                                            id='name'
                                                                                            type="text"
                                                                                            placeholder='Nom' name='name' className='form_input border-[1px]  focus:border-[#3A5A40] rounded-md placeholder:text-sm '
                                                                                            min={10} max={50}
                                                                                            {...register('name', { required: 'This feild is required*' })}
                                                                                        />
                                                                                        {errors.name && <p className='text-gray-800 text-xs'>{errors.name.message}</p>}
                                                                                        <div>Description</div>
                                                                                        <ReactQuill id='description'
                                                                                            type="text"
                                                                                            placeholder='Description'
                                                                                            value={content}
                                                                                            className='form_input border-[1px]  focus:border-[#3A5A40] rounded-md placeholder:text-sm mt-3'
                                                                                            onChange={(setContent)}
                                                                                            modules={modules}
                                                                                            formats={formats} 
                                            
                                                                                            />
                                                                                    </div>
                                                                                </div>
                                            
                                                                                <div>
                                                                                    <div>Name</div>
                                                                                    <div className="input_feilds">
                                            
                                                                                        <input
                                                                                            id='name_eng'
                                                                                            type="text"
                                                                                            placeholder='Name' name='name_eng' className='form_input border-[1px]  focus:border-[#3A5A40] rounded-md placeholder:text-sm '
                                                                                            min={10} max={50}
                                                                                            {...register('name_eng', { required: 'This feild is required*' })}
                                                                                        />
                                                                                        {errors.name && <p className='text-gray-800 text-xs'>{errors.name.message}</p>}
                                                                                        <div>Description</div>
                                                                                        <ReactQuill id='description_eng'
                                                                                            type="text"
                                                                                            placeholder='Description'
                                                                                            value={content_eng}
                                                                                            className='form_input border-[1px]  focus:border-[#3A5A40] rounded-md placeholder:text-sm mt-3'
                                                                                            onChange={(setContent_eng)}
                                                                                            modules={modules}
                                                                                            formats={formats} 
                                            
                                                                                            />
                                                                                    </div>
                                                                                </div>
                                            
                                                                                <div>
                                                                                    <div>Nome</div>
                                                                                    <div className="input_feilds">
                                            
                                                                                        <input
                                                                                            id='name_it'
                                                                                            type="text"
                                                                                            placeholder='Nome' name='name_it' className='form_input border-[1px]  focus:border-[#3A5A40] rounded-md placeholder:text-sm '
                                                                                            min={10} max={50}
                                                                                            {...register('name_it', { required: 'This feild is required*' })}
                                                                                        />
                                                                                        {errors.name && <p className='text-gray-800 text-xs'>{errors.name.message}</p>}
                                                                                        <div>Descrizione</div>
                                                                                        <ReactQuill id='description_it'
                                                                                            type="text"
                                                                                            placeholder='Descrizione'
                                                                                            value={content_it}
                                                                                            className='form_input border-[1px]  focus:border-[#3A5A40] rounded-md placeholder:text-sm mt-3'
                                                                                            onChange={(setContent_it)}
                                                                                            modules={modules}
                                                                                            formats={formats} 
                                            
                                                                                            />
                                                                                    </div>
                                                                                </div>
                                            
                                                                                <div>
                                                                                    <div>اسم</div>
                                                                                    <div className="input_feilds">
                                            
                                                                                        <input
                                                                                            id='name_ar'
                                                                                            type="text"
                                                                                            placeholder='اسم' name='name_ar' className='form_input border-[1px]  focus:border-[#3A5A40] rounded-md placeholder:text-sm '
                                                                                            min={10} max={50}
                                                                                            {...register('name_ar', { required: 'This feild is required*' })}
                                                                                        />
                                                                                        {errors.name && <p className='text-gray-800 text-xs'>{errors.name.message}</p>}
                                                                                        <div>وصف</div>
                                                                                        <ReactQuill id='description_ar'
                                                                                            type="text"
                                                                                            placeholder='وصف'
                                                                                            value={content_ar}
                                                                                            className='form_input border-[1px]  focus:border-[#3A5A40] rounded-md placeholder:text-sm mt-3'
                                                                                            onChange={(setContent_ar)}
                                                                                            modules={modules}
                                                                                            formats={formats} 
                                            
                                                                                            />
                                                                                    </div>
                                                                                </div>
                                        </div>



                                        {/* === Image Uploading Section Start Here === */}
                                        <div>
                                            <p className='font-content text-[16px] mb-3 font-normal text-black'>
                                                <span className='font-semibold mr-1'>{t("note")}</span>
                                        {t("image_note")}
                                            </p>
                                            <div className="image_upload_container md:p-5 md:border-2 bg-transparent border-dashed rounded-sm md:flex items-center justify-center gap-2">

                                                <input
                                                    onChange={(e) => setImageFile(e.target.files)}
                                                    required={formData.imgUrl < 1}
                                                    multiple  accept="video/mp4, image/*" type="file"
                                                    className={`file-input file:bg-green bg-white ${loading ? "md:w-4/6" : 'md:w-4/5'} w-full`} />
                                                <button
                                                    disabled={loading}
                                                    onClick={handleImageUpload}
                                                    type='button' className={`w-full  text-sm py-2  rounded-md mt-2 uppercase font-heading  ${loading ? "md:w-2/6" : 'md:w-1/5'} md:h-[3rem] md:mt-0 duration-500 hover:shadow-lg disabled:border-yellow-500 disabled:text-yellow-500`}>
                                                    {
                                                        loading ? t('uploading') : t('upload')
                                                    }
                                                </button>
                                            </div>
                                            <div>
                                                {
                                                    formData.imgUrl && formData.imgUrl.length > 0 && formData.imgUrl.map((imgSrc, index) => {
                                                        return (
                                                            <div key={index} className="uploaded_images p-2 pr-5 border-2 mt-4  rounded-md flex items-center justify-between">
                                                                <img src={imgSrc} alt="property Image" className='w-24 h-20 object-cover rounded-md' />
                                                                <button
                                                                    onClick={() => handleDelete(index)}
                                                                    type='button'
                                                                    className='font-medium text-lg text-red-700 flex items-center underline hover:opacity-75'>Delete</button>
                                                            </div>
                                                        )
                                                    })
                                                }
                                                <div className="post_btn mt-7">
                                                    <button
                                                        disabled={formData.imgUrl.length < 1 || loading || formSubmitLoading}
                                                        type='submit'
                                                        className="w-full bg-green text-xl tracking-wider font-heading rounded-md hover:opacity-90 disabled:opacity-70 duration-300 text-white p-3">
                                                        {
                                                            formSubmitLoading ? t('updating') : t('update_project')
                                                        }
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <ToastContainer />
                    </section>
            
        </main>
    )
}

export default UpdateService