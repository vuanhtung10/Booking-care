import actionTypes from "./actionTypes";
import {
    getAllCodeService,
    createNewUserService,
    getAllUsers,
    deleteUserService,
    editUserService,
    getTopDoctor,
    getAllDoctors,
    saveDetailInforDoctor,
} from "../../services/userService";
import { toast } from "react-toastify";

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START,
            });
            let res = await getAllCodeService("GENDER");
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (error) {
            dispatch(fetchGenderFailed());
            console.log("fetchGenderStart error", error);
        }
    };
};

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData,
});

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED,
});

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("POSITION");
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFailed());
            }
        } catch (error) {
            dispatch(fetchPositionFailed());
            console.log("fetchPositionStart error", error);
        }
    };
};

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData,
});

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED,
});

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("ROLE");
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFailed());
            }
        } catch (error) {
            dispatch(fetchRoleFailed());
            console.log("fetchRoleStart error", error);
        }
    };
};

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData,
});

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED,
});

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            console.log("hoi dan it check create user redux", res);
            if (res && res.errCode === 0) {
                toast.success("create a new user success", {
                    toastId: "customId",
                });
                dispatch(saveUserSuccess(res.data));
                dispatch(fetchAllUsersStart());
            } else {
                dispatch(saveUserFailed());
            }
        } catch (error) {
            dispatch(saveUserFailed());
            console.log("saveUserFailed error", error);
        }
    };
};

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
});

export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED,
});

export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers("ALL");
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users.reverse()));
            } else {
                toast.error("fetch all user error");
                dispatch(fetchAllUsersfailed());
            }
        } catch (error) {
            toast.error("fetch all user error");
            dispatch(fetchAllUsersfailed());
            console.log("fetchAllUsersfailed error", error);
        }
    };
};

export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data,
});

export const fetchAllUsersfailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED,
});

export const deleteAUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);
            if (res && res.errCode === 0) {
                toast.success("delete the user success", {
                    toastId: "success1",
                });
                dispatch(deleteUserSuccess(userId));
                dispatch(fetchAllUsersStart());
            } else {
                toast.error("delete the user error");
                dispatch(deleteUserfailed());
            }
        } catch (error) {
            toast.error("delete the user error");
            dispatch(deleteUserfailed());
            console.log("deleteUserfailed error", error);
        }
    };
};

export const deleteUserSuccess = (data) => ({
    type: actionTypes.DELETE_USERS_SUCCESS,
    users: data,
});

export const deleteUserfailed = () => ({
    type: actionTypes.DELETE_USERS_FAILED,
});

export const EditAUser = (data) => {
    return async (dispatch, getState) => {
        try {
            console.log("heree", data);
            let res = await editUserService(data);
            if (res && res.errCode === 0) {
                toast.success("update the user success", {
                    toastId: "success1",
                });
                dispatch(editUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                toast.error("update the user error");
                dispatch(editUserFalied());
            }
        } catch (error) {
            toast.error("update the user error");
            dispatch(editUserFalied());
            console.log("EditUserFalied error", error);
        }
    };
};

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,
});

export const editUserFalied = () => ({
    type: actionTypes.EDIT_USER_FAILED,
});

export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctor("6");
            console.log("check res props top doctor", res);
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
                    dataDoctors: res.data,
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
                });
            }
        } catch (error) {
            console.log("FETCH_TOP_DOCTOR_FAILED", error);
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
            });
        }
    };
};

export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctors();
            console.log("check res props all doctor", res);
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
                    dataDoctors: res.data,
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_FAILED,
                });
            }
        } catch (error) {
            console.log("FETCH_ALL_DOCTOR_FAILED", error);
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTOR_FAILED,
            });
        }
    };
};

export const saveDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailInforDoctor(data);
            if (res && res.errCode === 0) {
                toast.success("save info detail doctor success");
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
                });
            } else {
                toast.error("save info detail doctor error");
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
                });
            }
        } catch (error) {
            toast.error("save info detail doctor eror");
            console.log("SAVE_DETAIL_DOCTOR_FAILED", error);
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
            });
        }
    };
};

export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("TIME");
            console.log("check res props all doctor", res);
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data,
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
                });
            }
        } catch (error) {
            console.log("FETCH_ALLCODE_SCHEDULE_TIME_FAILED", error);
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
            });
        }
    };
};

export const getRequiredDoctorInfor = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START });

            let resPrice = await getAllCodeService("PRICE");
            let resPayment = await getAllCodeService("PAYMENT");
            let resProvince = await getAllCodeService("PROVINCE");
            if (
                resPrice &&
                resPrice.errCode === 0 &&
                resPayment &&
                resPayment.errCode === 0 &&
                resProvince &&
                resProvince.errCode === 0
            ) {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                };
                dispatch(fetchRequiredDoctorInforSuccess(data));
            } else {
                dispatch(fetchRequiredDoctorInforFailed());
            }
        } catch (error) {
            dispatch(fetchRequiredDoctorInforFailed());
            console.log("fetchRequiredDoctorInforFailed error", error);
        }
    };
};

export const fetchRequiredDoctorInforSuccess = (allRequiredData) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
    data: allRequiredData,
});

export const fetchRequiredDoctorInforFailed = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED,
});
