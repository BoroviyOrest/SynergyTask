import React from 'react';
import {NavLink} from 'react-router-dom'
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';


const styles = theme => ({
    root: {
        display: 'flex',
        borderBottom: '1px solid #e8e8e8',
    },
    item: {
        color: '#3f51b5',
        minWidth: '30px',
        minHeight: '30px',
        display: 'block',
        padding: '5px 15px',
        textDecoration: 'none',
        outline: 'none',
        fontFamily: "Roboto, sans-serif"
    },
    selected: {
        borderBottom: '2px solid #3f51b5',
    },
});

class Menu extends React.Component {
    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <NavLink
                    to="/users"
                    className={classes.item}
                    activeClassName={classes.selected}
                >
                    USERS
                </NavLink>
                <NavLink
                    to="/groups"
                    className={classes.item}
                    activeClassName={classes.selected}
                >
                    GROUPS
                </NavLink>
            </div>
        );
    }
}

Menu.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Menu);
