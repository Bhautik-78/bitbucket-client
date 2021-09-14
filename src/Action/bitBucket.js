import axios from "axios";
import appConfig from "../config";

export const fetchAllData = async (userDetail) => {
    try {
        const res = await axios.post(`${appConfig.appUrl}/bitBucket/fetch`,userDetail);
        return {success: res.data.success, message: res.data.message};
    } catch (err) {
        console.log("error in getting info : ", err);
        return {
            success: false,
            message: (err) || "something went wrong"
        };
    }
};

export const LoadData = async (userDetail) => {
    try {
        const res = await axios.post(`${appConfig.appUrl}/bitBucket/load`,userDetail);
        if(res.data.data.length){
            return {success: res.data.success, message : res.data.message, data : res.data.data}
        }else {
            return {success: res.data.success, message : res.data.message}
        }
    }catch (err) {
        console.log("error in getting info : ", err);
        return {
            success: false,
            message: (err) || "something went wrong"
        };
    }
};
