import { BASE_URL } from "./constants";

export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
		method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "name": name,
      "email": email,
      "password": password
		})
  })
  .then((res) => {
    if (res.ok) {
			return res.json();
      
		}
		return Promise.reject(res.status);
  })
}


export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
		method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "email": email,
			"password": password
			
		})
  })
  .then((res) => {
    if (res.ok) {
			return res.json();
		}
		return Promise.reject(res.status);
  })
}


export const check = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
			"Authorization" : `Bearer ${token}`
    }
  })
  .then((res) => {
    if (res.ok) {
			return res.json();
		}
		return Promise.reject(res.status);
  })
}

  