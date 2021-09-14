import axios from "axios";
import appConfig from "../config";

export const CreateAccount = async (userDetail) => {
    try {
        const res = await axios.post(`${appConfig.appUrl}/setting/create`,userDetail);
        return {success: res.data.success, message: res.data.message};
    } catch (err) {
        console.log("error in getting info : ", err);
        return {
            success: false,
            message: (err) || "something went wrong"
        };
    }
};

export const updateCustomer = async (userDetail) => {debugger
    let result = {};
    try {
        const res = await axios.put(`${appConfig.appUrl}/setting/edit/${userDetail._id}`, userDetail);
        result = res.data || {};
        return {success: true, data: result};
    }catch (err) {
        console.log("error in getting info : ", err);
        return {
            success: false,
            message: (err) || "something went wrong"
        };
    }
};

export const fetchUserAccount = async () => {
    try {
        const res = await axios.get(`${appConfig.appUrl}/setting/fetch`);
        return {success: res.data.success, data : res.data.data};
    } catch (err) {
        console.log("error in getting info : ", err);
        return {
            success: false,
            message: (err) || "something went wrong"
        };
    }
};

export const deleteCustomer = async (deleteId) => {
        let result = {};
        try {
            const res = await axios.delete(`${appConfig.appUrl}/setting/delete/${deleteId}`,);
            result = res.data || {};
            return {success: true, data: result};
        } catch (err) {
            console.log("error in getting info : ", err);
            return {
                success: false,
                message: (err) || "something went wrong"
            };
        }
};
