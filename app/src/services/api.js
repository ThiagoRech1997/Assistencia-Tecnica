import { AsyncStorage } from 'react-native';
import { create } from 'apisauce';

const api = create({
    baseURL: "http://192.168.0.111:3050"
});

api.addResponseTransform(response => {
    if (!response.ok) throw response;
});

export default api;