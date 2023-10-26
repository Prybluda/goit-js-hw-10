import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_0kWWCtj1zw1jxBsVDEeDtHEYoT0Thc9LtQ8nY5nxCnW0neY4ek4b7A9cG0jvOBkP";
axios.defaults.baseURL = 'https://api.thecatapi.com/v1';

function fetchBreeds(){
   return axios.get('/breeds')
.then(responce => {
    return responce.data});
 }

 function fetchCatByBreed(breedId) {
    return axios.get(`/images/search?breed_ids=${breedId}`).then(resp => {
      return resp.data;
    });
  }
  

export {fetchBreeds, fetchCatByBreed}
// fetchBreeds().then(res=> console.log(res))
