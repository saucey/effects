import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom';
import { LOGIN_USER } from '../store/actions';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import mediaRegisteredApi from '../api/mediaRegisteredApi'

const useStyles = props => makeStyles((theme) => ({
	selectControl: {
		width: '100%',
		marginBottom: '8px',
	},
	paper: {
	},
	form: {
		width: '100%', // Fix IE 11 issue.
	},
	customfield: {
		paddingTop: '0',
		marginTop: '0',
		'& .MuiInputLabel-root.Mui-shrink': {
			color: 'red'
			// "& .Mui-shrink": {
			// 	color: 'red'
			// },
		},
		'& .MuiOutlinedInput-input': {
			padding: '8.5px 14px',
		},
		'& .MuiOutlinedInput-root': {
			borderRadius: '0',

			'& fieldset': {
				borderColor: 'grey',
			},
			'&:hover fieldset': {
			},
		},
		"& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
			color: props.colorTheme
		},
		"& .MuiInputLabel-root.Mui-focused": {
			color: props.colorTheme
		},
		"& .MuiInputLabel-root.MuiInputLabel-shrink": {
			margin: '0!important'
		},
		"& .MuiInputLabel-root.MuiInputLabel-animated": {
			marginTop: '-8px'
		},
		"& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
			borderColor: props.colorTheme
		}
	},

	boxShadow: {
		position: 'relative',
		padding: '80px 100px 0',
		boxShadow: '0px 0px 20px rgba(0,0,0,0.30), 0 20px 20px rgba(0,0,0,0.22)',
		borderRadius: '30px',
		backgroundColor: 'white',
		marginTop: '-30px'
	},

	actionWrapper: {
		textAlign: 'right',
		padding: '12px 0 20px',
		'& p': {
			color: props.colorTheme,
			fontSize: '2em',
			margin: 0,
			marginBottom: '5px'
		},
		'& button': {
			marginLeft: '10px'
		},
	},
	joinBtn: {
		backgroundColor: props.colorTheme
	},
	loginBtn: {
		backgroundColor: 'transparent',
		color: props.colorTheme,
	},
	errorMsg: {
		color: 'red',
		marginBottom: '8px',
		marginTop: '-4px',
		display: 'block',
		fontSize: '.8em'

	}
}))

export default function MediaLoginForm(props) {

	const { type } = props
	const { register, handleSubmit, errors } = useForm({ mode: 'onSubmit', reValidateMode: 'onSubmit' })
	const classes = useStyles(props)()
	const history = useHistory();

	const [name, setName] = useState('')
	const [mediaBuyer, setMediaBuyer] = useState('')
	const [email, setEmail] = useState('')
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [channel, setChannel] = useState('')
	const [errorReps, setErrorReps] = useState('')

	const [mediaState, setMediaState] = useState('owner')

	const [errorMessaging, setErrorMessaging] = useState(null)

	const userLoggedIn = useSelector((state) => state.userLoggedIn);


	useEffect(() => {
	}, [])

	const dispatch = useDispatch()

	const onSubmit = data => {
		console.log(data, 'data')

		mediaRegisteredApi('http://localhost:5000/api/v1/register', data)
			.then((response) => {
				console.log(response);
			})
			.catch(error => {
				console.log(error, 'errors in catch!!!')
				// setErrorReps(error.error)
			});

		// history.push('/home')
	}


	const loginUser = (user) => {
		dispatch(LOGIN_USER(user))
	}

	const channelOnChange = (event) => {
		const channel = event.target.value
	}

	const toggleMedia = (type) => {
		setMediaState(type)
	}

	const toggleMediaSwitch = () => {

	}

	const submitForm = async () => {
		try {
			const user = await Auth.signIn(email, password)
			loginUser(user)
			return true;
		} catch (e) {
			setErrorMessaging(e.message);
			return false
		}
	}

	return (

		<div className={classes.boxShadow}>
			<div className={classes.paper}>
				<form
					className={classes.form}
					// ref={useRef()  }
					onSubmit={handleSubmit(onSubmit)}
				>
					<TextField
						className={classes.customfield}
						value={name}
						onChange={(e) => setName(e.target.value)}
						variant="outlined"
						margin="normal"
						fullWidth
						id="name"
						label="Name"
						name="name"
						autoComplete="name"
						autoFocus
						inputRef={register({ required: true })}
						error={errors.name?.type === 'required' || errors.name?.type === 'validate'}
					/>
					{errors.name?.type === 'required' && <span className={classes.errorMsg}>This field is required</span>}
					{errors.name?.type === 'validate' && <span className={classes.errorMsg}>{errorMessaging}</span>}
					<TextField
						className={classes.customfield}
						value={mediaBuyer}
						onChange={(e) => setMediaBuyer(e.target.value)}
						variant="outlined"
						margin="normal"
						fullWidth
						id="media-buyer"
						label="Media Buyer"
						name="media-buyer"
						autoComplete="media-buyer"
					/>
					{type === 'Planner' && <FormControl variant="outlined" className={[classes.selectControl, classes.customfield].join(' ')}>
						<InputLabel id="demo-simple-select-outlined-label">Channels</InputLabel>
						<Select
							labelId="demo-simple-select-outlined-label"
							id="demo-simple-select-outlined"
							value={channel}
							onChange={(event) => channelOnChange(event)}
							label="Feed Type"
						>
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
							<MenuItem value={'top-albums'}>Top Albums</MenuItem>
							<MenuItem value={'top-songs'}>Top Songs</MenuItem>
							<MenuItem value={'hot-tracks'}>Hot Tracks</MenuItem>
							<MenuItem value={'new-releases'}>New Releases</MenuItem>
							<MenuItem value={'coming-soon'}>Coming Soon</MenuItem>
						</Select>
					</FormControl>}
					<TextField
						className={classes.customfield}
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						variant="outlined"
						margin="normal"
						fullWidth
						id="email"
						label="Email"
						name="email"
						autoComplete="email"
						inputRef={register({ required: true })}
						error={errors.email?.type === 'required' || errors.email?.type === 'validate'}
					/>
					{errors.email?.type === 'required' && <span className={classes.errorMsg}>This field is required</span>}
					{errors.email?.type === 'validate' && <span className={classes.errorMsg}>{errorMessaging}</span>}
					<TextField
						className={classes.customfield}
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						variant="outlined"
						margin="normal"
						fullWidth
						id="username"
						label="Username"
						name="username"
						autoComplete="username"
					/>
					<TextField
						className={classes.customfield}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						variant="outlined"
						margin="normal"
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						inputRef={register({ required: true })}
						error={errors.password?.type === 'required' || errors.password?.type === 'validate'}
					/>
					{errors.password?.type === 'required' && <span className={classes.errorMsg}>This field is required</span>}
					{errors.password?.type === 'validate' && <span className={classes.errorMsg}>{errorMessaging}</span>}
					{errorReps !== '' && <span className={classes.errorMsg}>{errorReps}</span>}


					<div className={classes.actionWrapper}>
						<p style={{ display: 'block' }}>Media {type}</p>
						<div>
							<Button
								type="submit"
								variant="contained"
								color="primary"
								className={classes.joinBtn}
							>
								Join
		</Button>
							<Button
								type="submit"
								variant="contained"
								color="primary"
								className={classes.loginBtn}
							>login</Button></div>
					</div>
				</form>
			</div>
		</div>
	)
}
