import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_HOST_PRODUCT;

export default axios.create({
    baseURL: baseURL
})