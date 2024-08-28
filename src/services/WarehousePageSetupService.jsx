import axios from 'axios';

const api_url = process.env.REACT_APP_API_URL;

export async function deleteWarehouse(warehouse, token) {
    try {
        await axios.post(
            `${api_url}/warehouses/${warehouse._id}`,
            {
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

export async function getUsers(list, token) {
    try {
        const response = await axios.post(
            `${api_url}/warehouses/get-users`,
            {
                list: list
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