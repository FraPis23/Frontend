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

export async function getUser(user, token) {
    try {

        const response = await axios.post(
            `${api_url}/users/sub`,
            {
                sub: user.sub,
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


export async function addWarehouse (warehouse, token) {
    try {

        console.log(warehouse);

        const response = await axios.post(
            `${api_url}/warehouses`,
            {
                name : warehouse.name,
                description : warehouse.description,
                location : warehouse.location.coordinates,
                //lsThings : [],
                lsAdminsId : warehouse.lsAdminsId,
                lsUsersId : warehouse.lsUsersId,
                //lsOperations : []
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
        console.error("Errore durante la creazione del magazzino:", error);
        throw error;
    }
}
