import React from 'react'
// material ui
import { CircularProgress } from '@material-ui/core'
import useStyles from './userStyle'

const AppLoading = () => {

    const classes = useStyles()

    return (
        <div>
            <div className={classes.loadingCircle} open>
                <CircularProgress />
            </div>
        </div>
    )

}

export default AppLoading
