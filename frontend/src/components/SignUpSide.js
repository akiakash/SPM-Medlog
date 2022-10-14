import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import React, { useState, useEffect } from "react";

function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Built with love by the "}
      <Link color="inherit" href="https://material-ui.com/">
        Material-UI
      </Link>
      {" team."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [image, setImage] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [cPasswordClass, setCPasswordClass] = useState("form-control");
  const [isCPasswordDirty, setIsCPasswordDirty] = useState(false);

  useEffect(() => {
    if (isCPasswordDirty) {
      if (password === cPassword) {
        setShowErrorMessage(false);
        setCPasswordClass("form-control is-valid");
      } else {
        setShowErrorMessage(true);
        setCPasswordClass("form-control is-invalid");
      }
    }
  }, [cPassword]);

  const handleCPassword = (e) => {
    setCPassword(e.target.value);
    setIsCPasswordDirty(true);
  };

  //error
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  let [errors_name, seterrors_name] = useState("");
  let [errors_phone, seterrors_phone] = useState("");
  let [errors_email, seterrors_email] = useState("");
  let [errors_age, seterrors_age] = useState("");
  let [errors_password, seterrors_password] = useState("");

  const Clear = () => {
    setName("");
    setPhone("");
    setEmail("");
    setPassword("");
    setAge("");
    setImage("");
  };
  const CreateUSer = (e) => {
    setError(null);
    setLoading(true);

    let errors = {};

    if (!name.trim()) {
      errors.name = " Name field required";
      seterrors_name(errors.name);
    }
    if (!email.trim()) {
      errors.email = "  Email field required";
      seterrors_email(errors.email);
    }
    if (!phone.trim()) {
      errors.phone = " Phone Number field required";
      seterrors_phone(errors.phone);
    }
    if (!age.trim()) {
      errors.age = "  Age field required";
      seterrors_age(errors.age);
    }
    if (!password.trim()) {
      errors.password = "  Password field required";
      seterrors_password(errors.password);
    }
    if (
      name === "" ||
      phone === "" ||
      email === "" ||
      age === "" ||
      password === ""
    ) {
      setLoading(false);
    } else {
      axios
        .post("http://localhost:9999/usermanagement/signup", {
          Name: name,
          email: email,
          PhoneNumber: phone,
          Age: age,
          password: password,
          Image: image,
        })
        .then((res) => {
          console.log(res.data);
          window.location = "/";
          e.preventDefault();
          setName("");
          setPhone("");
          setAge("");
          setPassword("");
          setImage("");

          alert("Successfully Registered");

          // Window.location.reload(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label=" Name"
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
              {errors_name && (
                <span style={{ color: "red" }} className="errors">
                  {errors_name}
                </span>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="Email"
                label="Email"
                autoComplete="lname"
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors_email && (
                <span style={{ color: "red" }} className="errors">
                  {errors_email}
                </span>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                type="number"
                label="Phone Number"
                onChange={(e) => setPhone(e.target.value)}
              />
              {errors_phone && (
                <span style={{ color: "red" }} className="errors">
                  {errors_phone}
                </span>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Age"
                type="number"
                onChange={(e) => setAge(e.target.value)}
              />
              {errors_age && (
                <span style={{ color: "red" }} className="errors">
                  {errors_age}
                </span>
              )}
            </Grid>
            {/* <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Image"
                onChange={(e) => setImage(e.target.value)}
              />
            </Grid> */}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Password"
                type="password"
                value={password}
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors_password && (
                <span style={{ color: "red" }} className="errors">
                  {errors_password}
                </span>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Re-enter Password"
                type="password"
                autoComplete="current-password"
                className={cPasswordClass}
                id="confirmPassword"
                value={cPassword}
                onChange={handleCPassword}
              />
              {showErrorMessage && isCPasswordDirty ? (
                <div> Passwords did not match </div>
              ) : (
                ""
              )}
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => CreateUSer(e)}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Already have An account ? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <MadeWithLove />
      </Box>
    </Container>
  );
}
