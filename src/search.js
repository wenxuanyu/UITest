import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
}));

const SearchBar = ({ onChange, value, onClear }) => {
    const classes = useStyles();
    return (
        <div className={classes.search}>
            <div className={classes.searchIcon}>
                <SearchIcon />
            </div>
            <InputBase
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                onChange={onChange}
                value={value} />
        </div>
    );
}

export default SearchBar;