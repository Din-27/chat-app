import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const navigate = useNavigate()
    const [user, setUser] = useState(false);
    const [form, setForm] = useState({ username: '', password: '' })
    const queryParameters = new URLSearchParams(window.location.search)
    const username = queryParameters.get("username")

    const AddToken = (token) => {
        setUser(token)
        navigate(`/?username=${token}`)
    }

    const CheckToken = () => {
        if (!username || username === 'undefined') {
            navigate('/login')
        }
    }

    const HandleLogin = (e) => {
        e.preventDefault()
        if (form.username === "") {
            return alert('username harus diisi !')
        }
        if (form.password === "" && form.username !== "") {
            return alert('password harus diisi !')
        }
        console.log(form);
        AddToken(form.username)
    }

    const OnChangeLogin = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        CheckToken()
    }, [])


    return (
        <UserContext.Provider
            value={{ user, CheckToken, AddToken, HandleLogin, OnChangeLogin, form }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
