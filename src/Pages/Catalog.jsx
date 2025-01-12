import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Footer from '../components/Common/Footer';
import { useParams } from 'react-router-dom';
import { getAllCategories } from '../services/operations/coursesAPI';
import { getAllCategoryDetails } from '../services/operations/categoryAPI';
import CourseCard from '../components/Core/Catalog/CourseCard';
import CourseSlider from '../components/Core/Catalog/CourseSlider';

const tabDetails = [
    {
        id:1,
        tabName:"Most Selling"
    },
    {
        id:2,
        tabName:"New"
    }
]

const Catalog = () => {

    const dispatch = useDispatch();
    const {categoryName} = useParams();
    const [categoryId,setCategoryId] = useState(null);
    const [catalogPageData, setCatalogPageData] = useState(null);
    const [active, setActive] = useState(1);

    useEffect(() => {

        const fetchAllCategories = async() => {
            const result = await dispatch(getAllCategories());

            const category_id = result[0].filter((ct) => ct.name.split(" ").join("-").toLowerCase() === categoryName)[0]._id;
            setCategoryId(category_id);
        }

        fetchAllCategories();

    },[categoryName]);

    useEffect(() => {
        const getCategoryDetails = async() => {
            try{
                const result = await dispatch(getAllCategoryDetails(categoryId));
                setCatalogPageData(result);

            } catch(error){
                console.log("Error while fetching category Details")
            }
        }

        if(categoryId){
            getCategoryDetails();
        }
    },[categoryId])

  return (
    <div className='w-full text-richblack-200 flex flex-col gap-12'>
        <div className='bg-richblack-800 flex items-start gap-20 px-32 py-10'>
            <div className='w-[70%] flex flex-col gap-3'>
                <p>{`Home / Catalog / `}<span className='text-yellow-50'>{`${catalogPageData?.selectedCategory?.name}`}</span></p>
                <p className='text-richblack-5 text-2xl'>{`${catalogPageData?.selectedCategory?.name}`}</p>
                <p>{`${catalogPageData?.selectedCategory?.description}`}</p>
            </div>
            <div className='flex flex-col gap-3'>
                <p className='text-richblack-5 text-xl '>Related resources</p>
                <ul className='list-disc ml-6 flex flex-col gap-2'>
                    <li>CheatSheets</li>
                    <li>Articles</li>
                    <li>Community Forums</li>
                    <li>Projects</li>
                </ul>
            </div>
        </div>

        <div className='w-10/12 mx-auto flex flex-col gap-10'>
            {/* Section 1 */}
            <div className='flex flex-col gap-3'>
                <p className='text-richblack-5 font-semibold text-3xl'>Courses to get you started</p>
                <div className='flex pb-1 gap-4 mb-5 border-b-2 z-10'>
                    {
                        tabDetails.map((element,index) => (
                            <p key={index} onClick={() => setActive(element.id)} className={`z-20 px-3 relative top-[0.35rem] cursor-pointer ${active === element.id ? 'text-yellow-50 border-b-2 border-b-yellow-50' : 'text-richblack-200 border-b border-b-richblack-200'}`}>{element.tabName}</p>
                        ))
                    }
                </div>
                <CourseSlider Courses={active === 1 ? catalogPageData?.mostSellingCourses : catalogPageData?.selectedCategory?.course}/>
            </div>
            
            {/* Section 2 */}
            <div className='flex flex-col gap-6'>
                <p className='text-richblack-5 font-semibold text-3xl'>Top Courses in {`${catalogPageData?.selectedCategory?.name}`}</p>
                <div>
                    <CourseSlider Courses={catalogPageData?.differentCategory?.course}/>
                </div>
            </div>

            {/* Section 3 */}
            <div className='flex flex-col gap-6'>
                <p className='text-richblack-5 font-semibold text-3xl'>Frequently Bought</p>
                <div>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                        {
                            catalogPageData?.mostSellingCourses.slice(0,4).map((course,index) => (
                                <CourseCard course={course} key={index} Height={'max-h-[340px]'}/>
                            ))
                        }
                    </div>
                </div>
            </div>

        </div>
        <Footer/>
    </div>
  )
}

export default Catalog