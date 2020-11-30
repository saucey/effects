import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom';
import { LOGIN_USER } from '../../store/actions';
import mediaRegisteredApi from '../../api/mediaRegisteredApi'
import MediaLoginForm from '../../components/mediaLoginForm'

const useStyles = makeStyles((theme) => ({
	tab1: {
		color: '#e96941',
		'&.selected': {
			zIndex: 10
		}
	},

	tab2: {
		color: '#970eff',
		'&.selected': {
			zIndex: 10
		}
	},

	tabWrapper: {
		// display: 'flex',
		// justifyContent: 'space-evenly',
		marginTop: '50px',
		'& span': {
			'border-top-right-radius': '25px',
			'border-top-left-radius': '25px',
			fontWeight: 'bold',
			display: 'inline-block',
			padding: '20px 40px 50px',
			marginRight: '10px',
			backgroundColor: 'white',
			position: 'relative',
			cursor: 'pointer'
		},
	},
}))

export default function MediaLogin() {
	const { register, handleSubmit, errors } = useForm({ mode: 'onSubmit', reValidateMode: 'onSubmit' })
	const classes = useStyles()
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
				setErrorReps(error.error)
			});

	}

	console.log(errorReps, 'errors')

	const loginUser = (user) => {
		dispatch(LOGIN_USER(user))
	}

	const channelOnChange = (event) => {
		const channel = event.target.value
	}

	const toggleMedia = (type) => {
		setMediaState(type)
	}

	const ToggleMediaSwitch = () => {

		switch (mediaState) {
			case 'owner':
				return (
					<MediaLoginForm type="Owner" colorTheme="#e96941" />
				)
			case 'planner':
				return (
					<MediaLoginForm type="Planner" colorTheme="#970eff" />
				)
			default:
			// code block
		}
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
		<div className={classes.bg}>
			<Container maxWidth="sm">
				<div className={classes.tabWrapper}>
					<span onClick={() => toggleMedia('owner')} className={[classes.tab1, mediaState === 'owner' ? 'selected' : ''].join(' ')}>Media Owner</span>
					<span onClick={() => toggleMedia('planner')} className={[classes.tab2, mediaState === 'planner' ? 'selected' : ''].join(' ')}>Media Planner</span>
				</div>
				<ToggleMediaSwitch />
			</Container>
		</div>
	)
}
