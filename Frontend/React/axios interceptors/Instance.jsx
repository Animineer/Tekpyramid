import axios from "axios";
import { AUTH_CONSTANT, ROUTE_CONSTANTS } from "@src/constants/ui-constants";
import Store from "@src/app/Store";
import { hideLoader, showLoader } from "@src/app/Slices/loaderSlice";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const REFRESH_TOKEN_URL = import.meta.env.VITE_REFRESH_TOKEN_BASE_URL;

const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

instance.interceptors.request.use(
    async (config) => {
        if (!config.url.includes("auth/login")) {
            Store.dispatch(showLoader());
        }

        const token = JSON.parse(localStorage.getItem(AUTH_CONSTANT.ACCESS_TOKEN));
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        Store.dispatch(hideLoader());
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    async (response) => {
        if (!response.config.url.includes("auth/login")) {
            Store.dispatch(hideLoader());
        }
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response &&
            error.response.status === 401 &&
            error.response.data?.response?.toLowerCase().includes("expired") &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            const refreshToken = JSON.parse(
                localStorage.getItem(AUTH_CONSTANT.REFRESH_TOKEN)
            );
            if (refreshToken) {
                try {
                    const response = await axios.post(REFRESH_TOKEN_URL, {
                        refreshToken: refreshToken,
                    });

                    const newToken = response.data.response.accessToken;

                    localStorage.setItem(
                        AUTH_CONSTANT.ACCESS_TOKEN,
                        JSON.stringify(newToken)
                    );

                    localStorage.setItem(AUTH_CONSTANT.TOKEN, JSON.stringify(newToken));

                    localStorage.setItem(
                        AUTH_CONSTANT.REFRESH_TOKEN,
                        JSON.stringify(response.data.response.refreshToken)
                    );

                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    return instance(originalRequest);
                } catch (refreshError) {
                    localStorage.clear();
                    window.location.href = ROUTE_CONSTANTS.LOGINPAGE;
                }
            } else {
                localStorage.clear();
                window.location.href = ROUTE_CONSTANTS.LOGINPAGE;
            }
        }

        if (!error.config.url.includes("auth/login")) {
            Store.dispatch(hideLoader());
        }

        return Promise.reject(error);
    }
);

export default instance;