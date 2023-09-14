import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({ 

    loadingCircle : { 
        color: theme.palette.primary.main,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '50vh'
    }


}))

export default useStyles