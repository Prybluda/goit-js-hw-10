
import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_0kWWCtj1zw1jxBsVDEeDtHEYoT0Thc9LtQ8nY5nxCnW0neY4ek4b7A9cG0jvOBkP";

axios.defaults.baseURL = 'https://api.thecatapi.com/v1';

 function fetchBreeds(){
   return axios.get('/breeds')
.then((responce) => {
    if (!responce.ok){
        throw new Error(responce.statusText);
    }
    return console.log(responce.json());
});
}
export {fetchBreeds}