import React, { useState, useEffect, useRef, createRef, useMemo } from 'react';
import { makeStyles, fade, withTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { useForm } from 'react-hook-form'

//Radio
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

//Text field
import TextField from '@material-ui/core/TextField';

// Select
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

//Textarea
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

//Icon
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

//Button
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: '40px'
    },
    pageTitle: {
        color: '#e96941',
        fontWeight: 'normal'
    },
    formTitle: {
        color: "#1d8bf7",
        fontWeight: 'normal'
    },
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
    },
    textarea: {
        width: '100%',
        backgroundColor: '#f4f4f8',
        marginTop: '8px',
        borderRadius: '5px',
        padding: '14px'
    },
    customfield: {
        paddingTop: '0',
        marginTop: '0',
        backgroundColor: '#f4f4f8',
        borderRadius: '5px',
        '&textarea': {
            border: '1px solid red'
        },
        '&:hover': {
            backgroundColor: '#fff',
        },
        '&$focused': {
            backgroundColor: '#fff',
            boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
            borderColor: theme.palette.primary.main,
        },
        '& .MuiOutlinedInput-input': {
            padding: '8.5px 14px',
        },
        '& .MuiOutlinedInput-root': {
            borderRadius: '5px',

            '& fieldset': {
                borderColor: 'grey',
            },
            '&:hover fieldset': {
            },
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
            color: 'grey'
        },
        "& .MuiInputLabel-root.Mui-focused": {
            color: 'grey'
        },
        "& .MuiInputLabel-root.MuiInputLabel-shrink": {
            margin: '0!important'
        },
        "& .MuiInputLabel-root.MuiInputLabel-animated": {
            marginTop: '-8px'
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: 'grey'
        }
    },
    selectImgBtn: {
        marginTop: '10px',
        display: 'block',
        margin: '0 auto',
        color: '#ba54f5',
        border: '1px solid #ba54f5',
        padding: '5px 30px'
    },
    nextButton: {
        marginLeft: 'auto',
        backgroundColor: "#1d8bf7",
        color: 'white',
        display: 'block',
        padding: '5px 40px'
    }
}));

const Circulation = ({ value, nameType, onAudienceChange, id, inputRefs }) => {
    const classes = useStyles();
    const inputRef = useRef(id);
    const inputRef2 = createRef()

    useEffect(() => {

        if (nameType) {
            // debugger
            console.log(nameType, 'nameType')
            console.log(inputRef, 'here')
            // console.log(nameType, 'name type')
            // console.log(value, 'value')
            // console.log(inputRef.current.name, 'wtf')
            inputRef.current.focus()
        }
    }, [nameType === nameType])

    return (
        <TextField
            value={value}
            className={classes.customfield}
            onChange={onAudienceChange}
            variant="outlined"
            margin="normal"
            fullWidth
            id={nameType}
            label={nameType}
            name={nameType}
            autoComplete={nameType}
            inputRef={inputRef}
        />
    )
}

export default function CreateMedia() {
    const { register, handleSubmit, errors } = useForm({ mode: 'onSubmit', reValidateMode: 'onSubmit' })

    const [value, setValue] = useState('female');
    const [channel, setChannel] = useState('')
    const [name, setName] = useState('')
    const [audience, setAudience] = useState({
        circulation: '3',
        viewer: '100',
        catchment: '4'
    })

    const [circulation, setCirculation] = useState('')
    const [readership, setReadership] = useState('')
    const [catchment, setCatchment] = useState('')
    const [coverPrice, setCoverPrice] = useState('')

    const classes = useStyles();

    const inputEl = useRef([]);

    useEffect(() => {
    }, [audience, setAudience])

    const handleChange = (event) => {
        setChannel(event.target.value);
    };

    const selectImg = () => {

    }

    const onSubmit = data => {
        console.log(data, 'the data');
    }

    const onAudienceChange = (e, i) => {
        // inputEl.current[i + 1].focus();
        console.log(inputEl, 'inputEl')

        setAudience({
            ...audience,
            [e.target.name]: e.target.value
        });
        console.log(e.target.value, 'val');
        console.log(e.target.name, 'val');
        console.log(audience, 'aud')
    }

    function PIN({ length, onChange, value }) {
        const inputRefs = useMemo(() => Array(length).fill(0).map(i => React.createRef()), []);
        const handleChange = index => (e) => {
            //onChange(e); // don't know about the logic of this onChange if you have multiple inputs
            if (inputRefs[index]) {
                setAudience({
                    ...audience,
                    [e.target.name]: e.target.value
                });
                inputRefs[index].current.focus();
            }

        }
        return (
            <div>
                {
                    ['circulation', 'viewer', 'catchment'].map((val, index) => (
                        <TextField defaultValue={audience[val]} key={index} type="text" ref={inputRefs[index]} onChange={handleChange(index)} />
                    ))
                }
            </div>
        )
    }


    const ShowAudienceInputs = () => {

        switch (channel) {
            case '':
                return (
                    <div>
                        {/* {['circulation', 'viewer', 'catchment'].map((val, idx) => {
                            return (
                                <TextField
                                    key={idx}
                                    value={audience[val]}
                                    className={classes.customfield}
                                    onChange={(e) => onAudienceChange(e, idx)}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    id={val}
                                    label={val}
                                    name={val}
                                    autoComplete={val}
                                    autoFocus
                                />
                            )
                        })} */}
                        <Circulation value={audience.catchment} nameType="catchment" onAudienceChange={onAudienceChange} />
                        <Circulation value={audience.viewer} nameType="viewer" onAudienceChange={onAudienceChange} />
                        {/* <Circulation value={audience.catchment} nameType="catchment" onAudienceChange={onAudienceChange} /> */}
                    </div>
                )

            default:
            // code block
        }

    }

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <form
                        className={classes.form}
                        // ref={useRef()  }
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <Paper className={classes.paper}>
                            <h1 className={classes.pageTitle}>Create Media</h1>
                            <Grid container spacing={3}>
                                <Grid item md={2} sm={6} xs={12}>
                                    <h2 className={classes.formTitle}>Channel</h2>
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">Gender</FormLabel>
                                        <RadioGroup aria-label="gender" name="channel" value={channel} onChange={(event) => setChannel(event.target.value)}>
                                            <FormControlLabel value="television" control={<Radio />} label="Television" />
                                            <FormControlLabel value="radio" control={<Radio />} label="Radio" />
                                            <FormControlLabel value="print" control={<Radio />} label="Print" />
                                            <FormControlLabel value="digital-online" control={<Radio />} label="Digital/Onine" />
                                            <FormControlLabel value="ooh" control={<Radio />} label="OOH" />
                                            <FormControlLabel value="social" control={<Radio />} label="Social" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item md={4} sm={6} xs={12}>
                                    <h2 className={classes.formTitle}>Title</h2>
                                    <TextField
                                        value={name}
                                        className={classes.customfield}
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
                                        error={errors.channel?.type === 'required'}
                                    />

                                    <FormControl fullWidth variant="outlined" className={[classes.selectControl, classes.customfield].join(' ')}>
                                        <InputLabel id="demo-simple-select-outlined-label">Frequency</InputLabel>
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
                                    </FormControl>
                                    <Grid container>
                                        <TextareaAutosize className={classes.textarea} aria-label="minimum height" rowsMin={10} placeholder="Description" />
                                    </Grid>
                                </Grid>
                                <Grid item md={3} sm={6} xs={12}>
                                    <h2 className={classes.formTitle}>Audience (print)</h2>
                                    <ShowAudienceInputs />
                                    <PIN length={3} />
                                </Grid>
                                <Grid style={{ textAlign: 'center' }} item md={3} sm={6} xs={12}>
                                    <h2 className={classes.formTitle}>Cover / Thumb</h2>
                                    <CloudUploadIcon style={{ color: '#ba54f5', fontSize: '3em' }} />
                                    <Button className={classes.selectImgBtn} onClick={selectImg}>SELECT IMAGE</Button>
                                </Grid>
                            </Grid>
                            <Button className={classes.nextButton} type="submit">Next</Button>
                        </Paper>
                    </form>
                </Grid>
            </Grid>
        </div>
    );
}