import { AsyncStorage } from 'react-native';
import { create } from 'apisauce';

const api = create({
    baseURL: "http://172.27.8.131:3050"
});

api.addResponseTransform(response => {
    if (!response.ok) throw response;
});

export default api;