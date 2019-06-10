import { AsyncStorage } from 'react-native';
import { create } from 'apisauce';

const api = create({
    baseURL: "http://192.168.0.111:3050"
    //http://172.27.8.131:3050
});

api.addAsyncRequestTransform(request => async () => {
  const token = await AsyncStorage.getItem('@CodeApi:token');

  if (token)
    request.headers['Authorization'] = `Bearer ${token}`;
});

api.addResponseTransform(response => {
    if (!response.ok) throw response;
});

export default api;