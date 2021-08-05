import axios from "axios";

const api = axios.create({
  baseURL: "http://ddragon.leagueoflegends.com/",
});

export { api };
