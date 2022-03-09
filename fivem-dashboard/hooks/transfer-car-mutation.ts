import Cookies from 'js-cookie';
import getConfig from 'next/config';
import { useMutation } from 'react-query';

import { queryClient } from '../pages/_app';

const { publicRuntimeConfig } = getConfig()

const transferCarMutation = () => useMutation(async (data: { name: string, plate: string }) => {
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + Cookies.get("access_token"));
    const response = await fetch(`${publicRuntimeConfig.serverUrl}/vehicles/transfer`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            name: data.name,
            plate: data.plate
        }),
    });
    return await response.json()
}, {
    onSuccess: () => {
        queryClient.invalidateQueries('vehicles');
    }
});

export default transferCarMutation;