import { createContext, useContext, useState} from "react";


const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const [userID, setUserID] = useState(null)

    const login = async (username, password) => {
        let success;

        await fetch('https://1kkhj7pk6k.execute-api.eu-west-2.amazonaws.com/UserLogin', {
            method: 'POST',
            headers: {
              'Content-Type' : 'application/x-www-form-urlencoded',
              'Accept': 'application/json',
              'Cache': 'no-cache'
            },
            body: new URLSearchParams({
                'username': username,
                'password': password,
            })})
            .then((response) => {
                success = response.status === 200;

                return response.json();
            })
            .then((data) => {
                // setLocalStorage("userAccessToken", data.access_token);
                // setLocalStorage("userRefreshToken", data.refresh_token);

                setAccessToken(data.access_token);
                setRefreshToken(data.refresh_token);
                setUserID(data.userID);
                setUser(data.userID);
            })
            .catch((error) => {console.log(error); success = false});

        return success;
    }
    const getUserID = () => {
        return userID;
    }

    const register = async (firstname, lastname, username, password) => {
        let success;

        await fetch('http://18.170.74.59:8080/api/user/register', {
            method: 'POST',
            headers: {
              'Content-Type' : 'application/json',
            //   'Accept': 'application/json',
              'Cache': 'no-cache'
            },
            body: JSON.stringify(
                {
                    'firstname' : firstname,
                    'lastname' : lastname,
                    'email' : username,
                    'password' : password
                }
            )})
            .then((response) => {
                success = response.status === 200;

                return response.json()
            })
            .catch((error) => {console.log(error); success = false});

        return success;
    }

    const logout = () => {
        // localStorage.removeItem("userAccessToken");
        // localStorage.removeItem("userRefreshToken");

        setAccessToken(null);
        setRefreshToken(null);

        setUser(null);
    }

    const isLoggedIn = () => {
        return accessToken != null;
    }

    const getAccessToken = () => {
        return accessToken;
    }

    const getRefreshToken = () => {
        return refreshToken;
    }

    return(
        <AuthContext.Provider value={{user, login, register, logout, isLoggedIn, getAccessToken, getRefreshToken, getUserID}}>{children}</AuthContext.Provider>      
    )
}

const setLocalStorage = (name, data) => {
    localStorage.setItem(name, data);
  }

export const useAuth = () => {
    return useContext(AuthContext);
}