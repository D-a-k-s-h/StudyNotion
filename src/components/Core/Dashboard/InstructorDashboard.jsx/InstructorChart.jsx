import { Chart, registerables } from 'chart.js';
import React, { useState } from 'react'
import { Line, Pie } from 'react-chartjs-2';

Chart.register(...registerables);

const InstructorChart = ({courses}) => {

    const [currChart,setCurrChart] = useState("Students");

    //function to generate random colors
    function generateRandomColors(numColors){
        const colors = [];
        for(let i=0; i<numColors; i++){
            const color = `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},0.5)`
            colors.push(color);
        }
        return colors;
    }

    //create data for student info
    const chartDataForStudents = {
        labels:courses.map((course) => course?.name),
        datasets:[
            {
                fill:true,
                label:courses.map((course) => course?.name),
                data:courses.map((course) => course.totalStudentsEnrolled),
                backgroundColor:generateRandomColors(courses.length),
                borderColor: `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})`,

            }
        ]
    }

    //create data for income
    const chartDataForIncome = {
        labels:courses.map((course) => course?.name),
        datasets:[
            {
                fill:true,
                label:courses.map((course) => course?.name),
                data:courses.map((course) => course.totalAmountGenerated),
                backgroundColor:generateRandomColors(courses.length),
                borderColor: `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})`,
            }
        ]
    }

    //create options
    const options = {
        responsive:true,
        plugins:{
            legend:{
                position:'top',
                align:"center",

                labels:{
                    color:"#FFF",
                    font:{
                        size:15
                    }
                }
            },
        },
        layout:{
            padding:{
                top:10,
                bottom:10
            }
        }
    };

  return (
    <div className='flex flex-col items-center md:items-start md:w-[80%] bg-richblack-800 p-3 gap-2'>
        <p>Visualize</p>
        <div className='flex gap-4'>
            <button className={`p-2 rounded ${currChart === "Students" ? 'bg-richblack-700 text-yellow-50' : 'opacity-80'} hover:bg-richblack-700 transition-all duration-200`} onClick={() => setCurrChart("Students")}>Students</button>
            <button className={`p-2 rounded ${currChart === "Income" ? 'bg-richblack-700 text-yellow-50' : 'opacity-80'} hover:bg-richblack-700 transition-all duration-200`} onClick={() => setCurrChart("Income")}>Income</button>
        </div>
        <div className='w-full lg:w-[50%] self-center'>
            <Pie data={currChart === "Students" ? chartDataForStudents : chartDataForIncome} options={options}/>
        </div>
    </div>
  )
}

export default InstructorChart