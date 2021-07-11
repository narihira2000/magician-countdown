import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { createTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Container from '@material-ui/core/Container';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import imgMagician from './image/halloween_nekomajo.png';
import imgBackground from './image/bg_uchu_space.jpg';
import { useLocation } from 'react-router';
import { useHistory, Link as RouteLink } from 'react-router-dom';
import queryString from 'query-string';
import Countdown from 'react-countdown';
import { ArrowLeft, ChevronLeft, Share } from '@material-ui/icons';
import CopyToClipboard from 'react-copy-to-clipboard';
import { amber, lime, purple } from '@material-ui/core/colors';
import { borderRadius } from '@material-ui/system';
import GitHubButton from 'react-github-btn';
import { zhTW } from 'date-fns/locale';

function Copyright() {
    return (
        <Typography variant="body2" align="center" style={{ color: '#fff' }} >
            {'Copyright © '}
            <Link style={{ marginRight: 5 }} color="inherit" href="https://github.com/narihira2000">
                narihira2000
            </Link>
            <GitHubButton href="https://github.com/narihira2000/magician-countdown" aria-label="Star narihira2000/magician-countdown on GitHub">Star</GitHubButton>
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        // marginTop: theme.spacing(15),
        objectPosition: "50%",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent:"center",
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
    background: {
        backgroundImage: `url(${imgBackground})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '100vh'
    },
    root: {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: amber[500],
                borderWidth: 2
            },
            '&:hover fieldset': {
                borderColor: amber[700],
                borderWidth: 2
            },
        },
        '& .MuiLabel-root': {
            color: "#fff"
        },
        width: "100%",
    }
}));

const theme = createTheme({
    palette: {
        type: "dark",
        primary: amber,
    },
});

export default function App() {
    const classes = useStyles();
    const history = useHistory();
    const { search } = useLocation();
    const { date } = queryString.parse(search);

    const [isCopiedShow, setIsCopiedShow] = React.useState(false);

    const [birthday, setStartDate] = React.useState(new Date());
    const isDateExist = () => {
        return typeof date !== "undefined";
    }
    const isDateValid = () => {
        return /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/.test(date);
    }

    const handleSubmit = () => {
        history.push("/magician-countdown?date=" + birthday.getFullYear().toString() + "-" + (birthday.getMonth() + 1).toString() + "-" + birthday.getDate().toString());
    }

    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            return (
                <Typography component="h1" variant="h5" style={{ textAlign: "center", color: "#fff" }}>
                    恭喜你已成為魔法師!!
                </Typography>
            )
        }
        else {
            let yearDisplay = Math.floor(days / 365);
            let monthDisplay = Math.floor(days % 365 / 30);
            let dayDisplay = Math.floor(days % 365 % 30);
            console.log(days);
            return (
                <Typography noWrap component="h1" variant="h5" style={{ textAlign: "center", color: "#fff" }}>
                    距離成為魔法師還有<br></br>
                    {yearDisplay} 年 {monthDisplay} 個月 {dayDisplay} 天 {hours} 小時 {minutes} 分 {seconds} 秒
                </Typography>
            )
        }
    }

    React.useEffect(() => {
        if (isCopiedShow) {
            setTimeout(() => {
                setIsCopiedShow(false);
            }, 2000);
        }
    }, [isCopiedShow]);


    return (
        <div className={classes.background}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <ThemeProvider theme={theme}>
                    <div className={classes.paper}>
                        <img src={imgMagician} alt="magician" width="70%" style={{ marginTop: 150 }} />
                        <Typography component="h1" variant="h5" style={{ color: "#fff" }}>
                            {isDateExist() && isDateValid() ?
                                ""
                                :
                                "魔法師倒數計時器"
                            }
                        </Typography>
                        {isDateExist() && isDateValid() ?
                            <>
                                <Countdown
                                    date={new Date(parseInt(date.split("-")[0]) + 30, parseInt(date.split("-")[1]) - 1, parseInt(date.split("-")[2]))}
                                    renderer={renderer}
                                />
                                <Grid container style={{ justifyContent: "space-around", marginTop: 15 }}>
                                    <Grid item>
                                        <Button
                                            onClick={() => history.replace("/magician-countdown")}
                                            startIcon={<ChevronLeft />}
                                            color="primary"
                                            variant="contained"
                                        >
                                            重新輸入生日
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <ClickAwayListener onClickAway={() => setIsCopiedShow(false)}>
                                            <div>
                                                <Tooltip
                                                    PopperProps={{ disablePortal: true }}
                                                    open={isCopiedShow}
                                                    disableFocusListener
                                                    disableHoverListener
                                                    disableTouchListener
                                                    title="已複製!"
                                                    arrow
                                                >
                                                    <CopyToClipboard text={window.location.href}>
                                                        <Button
                                                            startIcon={<Share />}
                                                            onClick={() => setIsCopiedShow(true)}
                                                            disableElevation
                                                            variant="contained"
                                                            color="primary"
                                                            disabled={isCopiedShow}
                                                        >
                                                            分享結果
                                                        </Button>
                                                    </CopyToClipboard>
                                                </Tooltip>
                                            </div>
                                        </ClickAwayListener>

                                    </Grid>
                                </Grid>
                            </>
                            :
                            <form className={classes.form} noValidate>
                                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={zhTW} >
                                    <DatePicker
                                        className={classes.root}
                                        variant="inline"
                                        inputVariant="outlined"
                                        format="yyyy/MM/dd"
                                        margin="normal"
                                        id="date"
                                        label="你的生日"
                                        required
                                        value={birthday}
                                        views={["year", "month", "date"]}
                                        onChange={setStartDate}
                                        allowKeyboardControl
                                        autoOk
                                        disableFuture
                                    />
                                </MuiPickersUtilsProvider>
                                <Button
                                    onClick={() => handleSubmit()}
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    送出
                                </Button>
                            </form>
                        }
                    </div >
                    <Box mt={5}>
                        <Copyright />
                    </Box>
                </ThemeProvider>
            </Container >
        </div>
    );
}