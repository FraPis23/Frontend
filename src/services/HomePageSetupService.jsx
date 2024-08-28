import axios from 'axios';

const api_url = process.env.REACT_APP_API_URL;

export async function postUser(user, token) {
    try {
        await axios.post(
                `${api_url}/users`,
                {
                    picture: user.picture,
                    email: user.email,
                    nickname: user.nickname,
                    sub: user.sub
                },
                {
                    withCredentials: true,
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }
            );
    } catch (error) {
        console.log(error);
    }
}

export async function getWarehousesId(sub, token) {
    try {

        const response = await axios.post(
                `${api_url}/users/returnWarehouses`,
                {
                    sub: sub
                },
                {
                    withCredentials: true,
                    headers: {
                        authorization: `Bearer ${token}`,
                    }
                }
            );

        return response.data;

    } catch (error) {
        console.log(error);
    }
}

export async function getWarehouse(element, token) {
    try {

        const response = await axios.get(
                `${api_url}/warehouses/${element}`,
                {
                    withCredentials: true,
                    headers: {
                        authorization: `Bearer ${token}`,
                    }
                }
            );

        return response.data

    } catch (error) {
        console.log(error);
    }
}

export async function addWarehouse (account, warehouse, token) {
    try {
        console.log("Account", account);
        console.log("Warehouse", warehouse);

        const response = await axios.post(
            `${api_url}/warehouses`,
            {
                sub: account.sub,
                name: warehouse.name,
                description: warehouse.description,
                coordinates: warehouse.coordinates,
                lsAdminsNickname: warehouse.lsAdminsNickname,
                lsUsersNickname: warehouse.lsUsersNickname,
                icon: warehouse.selectedImage,
            },
            {
                withCredentials: true,
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }
        );

        console.log(response.data)

        return response.data;

    } catch (error) {
        console.log(error);
    }
}

export async function searchUserByNickname (text, token, sub) {
    try {
        const response = await axios.post(
            `${api_url}/users/search?text=${text}`,
            {
                sub: sub
            },
            {
                withCredentials: true,
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;

    } catch (error) {
        console.log(error);
    }
}