import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Button, Container, CssBaseline, Grid, TextField, Typography } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignUp() {
    const MySwal = withReactContent(Swal);
    const classes = useStyles();
    const [warningContent, setwarningContent] = useState("");
    const [passwordValidationResult, setpasswordValidationResult] = useState(true);

    //Form Data
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirmation, setPasswordConfirmation] = useState("");

    const passwordValidation = () => {
        if (password === password_confirmation) {
            setwarningContent('');
            return true;
        }
        else {
            setwarningContent('您輸入的兩個密碼並不相符，請再試一次。');
            return false;
        }
    }

    const emailValidation = () => {
        // eslint-disable-next-line no-useless-escape
        let emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
        if (email.search(emailRule) !== -1 || email === '') {
            return true;
        } else {
            return false;
        }
    }

    const validateForm = () => {
        let emailValidationResult = emailValidation();

        return name.length > 0 && email.length > 0 && password.length > 0 && password_confirmation.length > 0 && emailValidationResult;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        let result = passwordValidation();

        if (result) {
            setpasswordValidationResult(true);

            let data = new FormData();
            data.append("name", name);
            data.append("email", email);
            data.append("password", password);
            data.append("password_confirmation", password_confirmation);

            fetch(`${process.env.REACT_APP_API_SERVER}/signup`, {
                method: 'POST',
                body: data
            }).then(res => {
                console.log(res.status);
                if (res.status === 400) {
                    MySwal.fire({
                        title: 'Email重複',
                        text: '這個Email已有人使用，請試試其他Email。',
                        icon: 'warning',
                        confirmButtonText: "OK",
                    })
                    return;
                } else {
                    res.json().then((res) => {
                        console.log(res);
                        if (res.message === 'signup success') {
                            MySwal.fire({
                                title: '註冊成功',
                                text: 'Thanks, Your account has been successfully create',
                                icon: 'success',
                                confirmButtonText: "OK",
                            })
                            // .then(() => {
                            //     window.location.href = '/SignIn';
                            // })
                        }
                    })
                }
            }).catch(e => {
                console.log(e);
            })
        } else {
            setpasswordValidationResult(false);
        }

    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <AccountCircle />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                name="name"
                                autoComplete="name"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={!emailValidation()}
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={!passwordValidationResult}
                                helperText={warningContent}
                                variant="outlined"
                                required
                                fullWidth
                                name="password_confirmation"
                                label="Password_Confirmation"
                                type="password"
                                id="password_confirmation"
                                autoComplete="current-password"
                                onChange={(e) => setPasswordConfirmation(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={!validateForm()}
                    >
                        Sign Up
                    </Button>

                    {/* <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/SignIn" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid> */}
                </form>
            </div>
        </Container>
    );
}