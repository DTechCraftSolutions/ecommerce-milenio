import axios from "axios";

interface IApi {
    method: "get" | "post" | "put" | "delete";
    path: string;
    body?: any;
    query?: any;}

export async function fetchApi({method, path, body, query}: IApi) {
    const api = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        timeout: 7000,
        headers: {
            "Content-Type": "application/json",
        },
    })
    
    try {
        if (method === "get") {
            const response = await api.get(path, {params: query});
            return response.data ;
        } else if (method === "post") {
            const response = await api.post(path, body, {params: query});
            return response.data ;
        } else if (method === "put") {
            const response = await api.put(path, body, {params: query});
            return response.data ;
        } else if (method === "delete") {
            const response = await api.delete(path, {params: query});
            return response.data ;
        }
    }catch (e) {
        console.log(e)
    }

}