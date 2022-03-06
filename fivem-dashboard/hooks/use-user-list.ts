import Cookies from 'js-cookie';
import getConfig from 'next/config';
import { useQuery } from 'react-query';

const { publicRuntimeConfig } = getConfig()

export const fetchUserList = async () => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + Cookies.get("access_token"));
    const data = await fetch(`${publicRuntimeConfig.serverUrl}/user/list`, { headers });
    const json = await data.json();
    if (json.message == "Unauthorized") {
        return null;
    }
    return json;
}

const useUserList = () => useQuery(['userList'], () => fetchUserList())

export default useUserList;

