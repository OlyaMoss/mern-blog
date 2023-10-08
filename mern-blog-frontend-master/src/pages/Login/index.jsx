import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Navigate, useParams} from "react-router-dom";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import {useForm} from "react-hook-form";
import styles from "./Login.module.scss";
import {fetchAuth, selectIsAuth} from "../../redux/slices/auth";

export const Login = () => {
    const isAuth = useSelector(selectIsAuth);
    const dispatch = useDispatch();
    const {register, handleSubmit, setError, formState: {errors, isValid}} = useForm({
        defaultValues: {
            email: 'olyaM@gmail.com',
            password: '451208'
        },
        mode: 'onChange'
    })

    const onSubmit = async (values) => {
        const data = await dispatch(fetchAuth(values));
        if ('token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token);
        } else {
            alert('Failed to login')
        }
    }
    if (isAuth) {
        return <Navigate to="/"/>
    }
    return (
        <Paper classes={{root: styles.root}}>
            <Typography classes={{root: styles.title}} variant="h5">
                Вход в аккаунт
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    className={styles.field}
                    label="E-Mail"
                    type='email'
                    helperText={errors.email?.message}
                    {...register('email', {required: 'Enter email'})}
                    fullWidth
                />
                <TextField className={styles.field}
                           label="Пароль"
                           helperText={errors.password?.message}
                           {...register('password', {required: 'Enter password'})}
                           fullWidth/>
                <Button type="submit" size="large" variant="contained" fullWidth>
                    Войти
                </Button>
            </form>
        </Paper>
    );
};
