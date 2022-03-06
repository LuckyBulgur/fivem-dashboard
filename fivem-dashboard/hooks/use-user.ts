import Cookies from 'js-cookie';
import getConfig from 'next/config';
import { useQuery } from 'react-query';

const { publicRuntimeConfig } = getConfig()

export const fetchUser = async (access_token?: string) => {
    const headers = new Headers();
    if (typeof access_token === 'undefined') {
        access_token = Cookies.get("access_token");
    }
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + access_token);
    const data = await fetch(`${publicRuntimeConfig.serverUrl}/user`, { headers });
    const json = await data.json();
    if (json.message == "Unauthorized") {
        return null;
    }
    return json;
}

const useUser = (access_token?: string) => useQuery(['user'], () => fetchUser(access_token))

export default useUser;

