import AsyncStorage from '@react-native-community/async-storage';
import { create } from 'apisauce';

const api = create({
    baseURL: "http://172.27.8.131:3050",
    //http://172.27.8.131:3050
});

api.addAsyncRequestTransform(request => async () => {
  var token = await AsyncStorage.getItem('@CodeApi:token');

  if (token)
    request.headers['Authorization'] = `Bearer ${token}`;
}); 

api.addResponseTransform(response => {
    if (!response.ok) throw response;
});

export default api;