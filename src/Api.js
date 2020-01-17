import axios from "axios";
const URL = "https://api.punkapi.com/v2"

export const Get_Beers = (food) => {
    let data = {}
    if(food!==null){
        data["food"]=food
    }


    return axios({
        method: "GET",
        url: URL + "/beers",
        params: data,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded',
        }
    })


};