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

export async function deleteUser(type, sub, warehouseId, token, grade) {
    try {
        const response = await axios.post(
            `${api_url}/warehouses/delete-user`,
            {
                type: type,
                sub: sub,
                warehouseId: warehouseId,
                grade: grade
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

export async function addUser(nickname, warehouseId, token, grade) {
    try {
        const response = await axios.post(
            `${api_url}/warehouses/add-user`,
            {
                nickname: nickname,
                warehouseId: warehouseId,
                grade: grade
            },
            {
                withCredentials: true,
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data
    } catch (error) {
        console.log(error);
    }
}

export async function modifyPermissions(type, sub, warehouseId, token, grade) {
    try {
        const response = await axios.post(
            `${api_url}/warehouses/modify-permissions`,
            {
                type: type,
                sub: sub,
                warehouseId: warehouseId,
                grade: grade
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

export async function createThing(newThing, warehouseId, token) {
    try {
        console.log("ID  ", token);
        const response = await axios.post(
            `${api_url}/warehouses/create-thing`,
            {
                warehouseId: warehouseId,
                name: newThing.name,
                minQuantity: newThing.minQuantity,
                quantity: newThing.quantity,
                picture: newThing.picture

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

export async function getThings(list, token) {
    try {

        const response = await axios.get(
            `${api_url}/warehouses/get-thing`,
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

export async function deleteThing(warehouseId, thingId, token) {
    try {
        const response = await axios.post(
            `${api_url}/warehouses/delete-thing`,
            {
                warehouseId : warehouseId,
                thingId: thingId,
            },
            {
                withCredentials: true,
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data
    } catch (error) {
        console.log(error);
    }
}

export async function modifyQuantity(thingId, warehouseId, quantity, token) {
    try {
        const response = await axios.post(
            `${api_url}/warehouses/modify-quantity`,
            {
                thingId: thingId,
                warehouseId : warehouseId,
                quantity: quantity
            },
            {
                withCredentials: true,
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data
    } catch (error) {
        console.log(error);
    }
}