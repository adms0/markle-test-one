import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({ 

    // title : { 
    //     color : theme.palette.primary.main,
    //     textAlign: 'center', 
    // }, 
    // loadingBox : { 
    //     display: 'flex', 
    //     flexDirection: 'column', 
    //     justifyContent: 'center', 
    //     height: '100vh'
    // }

    backdrop : { 
        zIndex: theme.zIndex.drawer + 1,
        color: theme.palette.primary.main,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center', 
        height: '100vh'
    }


}))

export default useStyles