import axios from "axios";

// const BASE_URL = "http://localhost:3000";

const BASE_URL = "https://dnc-back.onrender.com";

export class LivrosService {
  static getLivros() {
    return axios.get(BASE_URL + "/books");
  }

  static getLivro(id) {
    return axios.get(`${BASE_URL}/books/${id}`);
  }

  static createLivro(body) {
    return axios.post(`${BASE_URL}/books/new`, body);
  }

  static updateLivro(id, body) {
    return axios.patch(`${BASE_URL}/books/edit/${id}`, body);
  }

  static deleteLivro(id) {
    return axios.delete(`${BASE_URL}/books/delete/${id}`);
  }
}
