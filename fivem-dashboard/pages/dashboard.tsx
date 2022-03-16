import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

import Card, { CardItem } from '../components/card';
import CircularItem from '../components/circular-item';
import Tooltip from '../components/tooltip';
import { TransferCarForm } from '../components/transfer-car-form';
import { formatDollar } from '../helpers/formatDollar';
import { formatPercent } from '../helpers/formatPercent';
import useUser from '../hooks/use-user';
import useUserList from '../hooks/use-user-list';
import useVehicles from '../hooks/use-vehicles';

import type { NextPage } from 'next'
//import { isMobile } from 'react-device-detect';

const Dashboard: NextPage = () => {

    const router = useRouter();
    const access_token = router.query.access_token as string ?? Cookies.get('access_token') as string;
    Cookies.set('access_token', access_token, { expires: 365 });

    const user = useUser(access_token);

    const userList = useUserList();
    const vehicles = useVehicles();

    return (
        <div className="min-h-screen flex min-w-screen align-center justify-center flex-col bg-gradient-to-t from-myblue to-second">
            <div className='flex justify-center h-screen items-center'>
                {(user && user.isSuccess && user.data) &&
                    <Card className='w-[80%]' title={`${user.data.firstname} ${user.data.lastname} (${user.data.sex.toUpperCase()})`}>
                        <div className='text-center font-semibold text-xl text-fontwhite mt-4'>📍Server Name, Deutschland</div>

                        <div className='flex flex-col sm:flex-row mt-10 justify-between lg:ml-24 lg:mr-24 text-fontwhite'>
                            <CardItem subtitle='Bargeld'>{formatDollar(user.data.money)}</CardItem>
                            <CardItem subtitle='Bank'>{formatDollar(user.data.bank)}</CardItem>
                            <CardItem subtitle='Größe'>{user.data.height}cm</CardItem>
                            <CardItem subtitle='Geburtsdatum'>{user.data.dateofbirth}</CardItem>
                        </div>

                        <div className='flex mt-10 justify-center text-fontwhite'>
                            <div className='flex justify-between w-72 sm:w-96'>
                                <Tooltip text={`Du bist ${100 - parseInt(JSON.parse(user.data.status)[0].percent)}% hungrig`}>
                                    <CircularItem className='border-2 border-amber-600'>{formatPercent(JSON.parse(user.data.status)[0].percent)}</CircularItem>
                                </Tooltip>
                                <Tooltip text={`Du bist ${100 - parseInt(JSON.parse(user.data.status)[1].percent)}% durstig`}>
                                    <CircularItem className='border-2 border-blue-700'>{formatPercent(JSON.parse(user.data.status)[1].percent)}</CircularItem>
                                </Tooltip>
                                <Tooltip text={`Du bist ${formatPercent(JSON.parse(user.data.status)[2].percent)} betrunken`}>
                                    <CircularItem className='border-2 border-violet-700'>{formatPercent(JSON.parse(user.data.status)[2].percent)}</CircularItem>
                                </Tooltip>
                                <Tooltip text={user.data.is_dead ? "Du bist Tot" : "Du bist am Leben"}>
                                    <CircularItem className={`border-2 ` + (user.data.is_dead ? "border-red" : "border-green-700")}>{user.data.is_dead ? "Tot" : "Leben"}</CircularItem>
                                </Tooltip>
                            </div>
                        </div>

                        <div className='flex justify-center sm:mt-10'>
                            {
                                userList.isSuccess && userList.data && vehicles.isSuccess && vehicles.data &&
                                <TransferCarForm vehicles={vehicles.data} userList={userList.data}></TransferCarForm>
                            }
                        </div>
                    </Card>
                }
            </div>
        </div>
    )
}

export default Dashboard