import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Button, CssBaseline, TextField, Typography, Container } from '@material-ui/core';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { AuthContext } from './auth/context';
import { setAuthToken } from './auth/utils';
import { getUser } from './auth/getUser';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignIn() {
    const { setUser } = useContext(AuthContext)
    const MySwal = withReactContent(Swal);
    const history = useHistory();
    const classes = useStyles();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const emailValidation = () => {
        // eslint-disable-next-line no-useless-escape
        let emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
        if (email.search(emailRule) !== -1 || email === '') {
            console.log("true");
            return true;
        } else {
            console.log("false");
            return false;
        }
    }
    const validateForm = () => {
        let emailValidationResult = emailValidation();

        return email.length > 0 && password.length > 0 && emailValidationResult;
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();

        console.log('email: ', email)
        console.log('password: ', password)

        let data = new FormData();
        data.append("email", email);
        data.append("password", password);

        fetch(`${process.env.REACT_APP_API_SERVER}/signin`, {
            method: 'POST',
            body: data
        }).then(res => res.json())
            .then((res) => {
                console.log(res);
                setUser(null);
                if (res.token === 'Authorization Failed') {
                    MySwal.fire({
                        title: '登入失敗',
                        icon: 'error',
                        confirmButtonText: "OK",
                    })
                } else {
                    setAuthToken(res.token);
                    getUser().then((res) => {
                        console.log(res);
                        if (res.error === '授權失敗') {
                            // 在 getMe() 出錯代表還沒成功登入，因此要把 token 清空
                            setAuthToken(null);
                            MySwal.fire({
                                title: '登入驗證失敗',
                                icon: 'error',
                                confirmButtonText: "OK",
                            })
                        } else {
                            setUser(res.data.name);
                            MySwal.fire({
                                title: '登入成功',
                                icon: 'success',
                                confirmButtonText: "OK",
                            }).then(() => {
                                history.push('/');
                            })
                        }
                    }
                    )
                }
            }).catch(e => {
                console.log(e);
            })
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <TextField
                        error = {!emailValidation()}
                        type="email"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={!validateForm()}
                    >
                        Sign In
                    </Button>

                    {/* <Grid container>
                        <Grid item>
                            <Link href="/SignUp" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid> */}
                </form>
            </div>
        </Container>
    );
}