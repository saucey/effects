export const Circulation = ({ nameType, whatthe }) => {
    return (
        <TextField
            defaultValue={audience[nameType]}
            className={classes.customfield}
            onChange={(e) => whatthe(e.target.value, e.target.name)}
            variant="outlined"
            margin="normal"
            fullWidth
            id={nameType}
            label={nameType}
            name={nameType}
            autoComplete={nameType}
            inputRef={register({ required: true })}
            error={errors[nameType]?.type === 'required'}
        />
    )
}