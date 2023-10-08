import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {fetchAuth, fetchRegister, selectIsAuth} from "../../redux/slices/auth";
import {useForm} from "react-hook-form";
import {Navigate} from "react-router-dom";

export const Registration = () => {
    const isAuth = useSelector(selectIsAuth);
    const dispatch = useDispatch();
    const {register, handleSubmit, setError, formState: {errors, isValid}} = useForm({
        defaultValues: {
            fullName: 'Dmitry Tarasov',
            email: 'dima@gmail.com',
            password: '12345'
        },
        mode: 'onChange'
    })
    const onSubmit = async (values) => {
        const data = await dispatch(fetchRegister(values));
        if ('token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token);
        } else {
            alert('Failed to register')
        }
    }
    if (isAuth) {
        return <Navigate to="/"/>
    }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField className={styles.field}
                       label="Full Name"
                       //error={Boolean(errors.fullname?.message)}
                       helperText={errors.fullName?.message}
                       {...register('fullName', {required: 'Enter full name'})}
                       fullWidth
            />
            <TextField className={styles.field}
                       label="E-Mail"
                       helperText={errors.email?.message}
                       {...register('email', {required: 'Enter email'})}
                       fullWidth/>
            <TextField className={styles.field}
                       label="Password"
                       helperText={errors.password?.message}
                       {...register('password', {required: 'Enter password'})}
                       fullWidth/>
            <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
                Зарегистрироваться
            </Button>
  </form>
    </Paper>
  );
};