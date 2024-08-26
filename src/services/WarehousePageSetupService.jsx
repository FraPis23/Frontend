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