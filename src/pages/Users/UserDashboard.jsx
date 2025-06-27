import React, { useContext, useEffect, useState } from 'react'
import { useUserAuth } from '../../hooks/useUserAuth'
import { UserContext } from '../../context/UserContext';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useNavigate } from "react-router-dom"
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import moment from "moment"
import InfoCard from '../../components/cards/InfoCard';
import { addThousandsSeparator } from '../../utils/helper';
import { LuArrowRight } from 'react-icons/lu';
import TaskListTable from '../../components/TaskListTable';
import CustomPieChart from '../../components/charts/CustomPieChart';
import CustomBarChart from '../../components/charts/CustomBarChart';


const COLORS = ["#BD51ff", "#00BBDB", "#7BCE00"]


const UserDashboard = () => {
    useUserAuth();

    const { user } = useContext(UserContext);
    const navigate = useNavigate();


    const [dashboardData, setDashboardData] = useState(null);
    const [pieChartData, setPieChartData] = useState([]);
    const [barChartData, setBarChartData] = useState([]);


    const prepareChartData = (data) => {

        console.log(data);

        const taskDistribution = data?.taskDistribution || null;
        const taskPriorityLevels = data?.taskPriorityLevels || null;

        const taskDistributionData = [
            { status: "Pending", count: taskDistribution?.Pending || 0 },
            { status: "In Progress", count: taskDistribution?.InProgress || 0 },
            { status: "Completed", count: taskDistribution?.Completed || 0 },
        ]

        setPieChartData(taskDistributionData);

        const PriorityLevelData = [
            { priority: "Low", count: taskPriorityLevels?.Low || 0 },
            { priority: "Medium", count: taskPriorityLevels?.Medium || 0 },
            { priority: "High", count: taskPriorityLevels?.High || 0 },
        ]

        setBarChartData(PriorityLevelData)
    }

    const getDashboardData = async () => {
        try {
            const response = await axiosInstance.get(API_PATHS.TASKS.GET_USER_DASHBOARD_DATA);

            if (response.data) {
                setDashboardData(response.data)
                prepareChartData(response.data?.charts);
            }

        } catch (error) {
            console.error("Error fetching users", error);
        }
    }


    useEffect(() => {
        getDashboardData();
        return () => { }
    }, []);


    const onSeeMore = () => {
        navigate("/user/my-tasks ")
    }



    return (
        <div>   
            <DashboardLayout activeMenu="Dashboard" >
                <div className="card my-5 ">
                    <div className="">
                        <div className="col-span-3">
                            <h2 className='text-xl md:text-2xl ' >Good morning! {user?.name} </h2>
                            <p className='text-xs md:text-[13px] text-gray-400 mt-1.5  ' >{moment().format("dddd Do MMM YYYY ")}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2  sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-5 ">
                        <InfoCard label="Total Tasks"
                            value={addThousandsSeparator(dashboardData?.charts?.taskDistribution?.All || 0)}
                            color="bg-primary"
                        />
                        <InfoCard label="Pending Tasks"
                            value={addThousandsSeparator(dashboardData?.charts?.taskDistribution?.Pending || 0)}
                            color="bg-violet-500"
                        />
                        <InfoCard label="In Progress Tasks"
                            value={addThousandsSeparator(dashboardData?.charts?.taskDistribution?.InProgress || 0)}
                            color="bg-cyan-500"
                        />
                        <InfoCard label="Completed Tasks"
                            value={addThousandsSeparator(dashboardData?.charts?.taskDistribution?.Completed || 0)}
                            color="bg-lime-500"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4 md:my-6  ">

                    <div>
                        <div className="card">
                            <div className="flex items-center justify-between ">
                                <h5>Task Distribution</h5>
                            </div>
                            <CustomPieChart
                                data={pieChartData}
                                colors={COLORS} />
                        </div>
                    </div>
                    <div>
                        <div className="card">
                            <div className="flex items-center justify-between ">
                                <h5>Task Priority levels</h5>
                            </div>
                            <CustomBarChart data={barChartData} />
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <div className="card">
                            <div className="flex items-center justify-between ">
                                <h5 className='text-lg' >Recent Task</h5>
                                <button className='card-btn' onClick={onSeeMore}>
                                    See All <LuArrowRight />
                                </button>
                            </div>
                            <TaskListTable tableData={dashboardData?.recentTasks || []} />
                        </div>
                    </div>
                </div>

            </DashboardLayout>
        </div>
    )
}

export default UserDashboard