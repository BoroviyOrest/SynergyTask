import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from "axios";

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 25,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
        left: '50%',
        top: '25%',
        transform: 'translateX(-50%)',
    },
    buttons: {
        position: 'relative',
        marginLeft: '15%',
        marginTop: '1rem',
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        marginLeft: 0,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
});

class UserModal extends React.Component {
    state = {
        nickname: '',
        groupsData: [],
        groupId: null,
    };

    componentDidMount() {
        this.getGroups();

        const user = this.props.userData;
        if (user)
            this.setState({
                nickname: user.nickname,
                groupId: user.group_id,
            });
    };

    getGroups = () => {
        const URL = 'api/v1/groups/';

        axios.get(URL)
            .then(response => {
                if (response.status === 200)
                    this.setState({groupsData: response.data});
            })
            .catch(error => console.log(error));
    };

    submit = () => {
        const user = this.props.userData;
        if (user)
            this.updateUser(user.user_id);
        else
            this.createUser();
    };

    createUser = () => {
        const URL = 'api/v1/users/';

        axios.post(URL, {
            nickname: this.state.nickname,
            group_id: this.state.groupId,
        })
            .then(response => {
                if (response.status === 200) {
                    this.props.reloadData();
                    this.props.close();
                }
            })
            .catch(error => console.log(error));
    };

    updateUser = (userId) => {
        const URL = 'api/v1/users/';

        axios.put(URL + userId, {
            nickname: this.state.nickname,
            group_id: this.state.groupId,
        })
            .then(response => {
                if (response.status === 200) {
                    this.props.reloadData();
                    this.props.close();
                }
            })
            .catch(error => console.log(error));
    };

    handleChangeName = (event) => {
        this.setState({nickname: event.target.value});
    };

    handleChangeGroup = (event) => {
        this.setState({groupId: event.target.value});
    };

    render() {
        const {classes, userData} = this.props;

        return (
            <div className={classes.paper}>
                <Typography variant="h6" id="modal-title">
                    {userData ? 'Edit' : 'Create'} user
                </Typography>
                <TextField
                    id="nickname"
                    label="Nickname"
                    value={this.state.nickname}
                    onChange={this.handleChangeName}
                    margin="normal"
                />
                <form className={classes.root} autoComplete="off">
                    <FormControl className={classes.formControl}>
                        <InputLabel shrink htmlFor="age-label-placeholder">
                            Group
                        </InputLabel>
                        <Select
                            value={this.state.groupId}
                            onChange={this.handleChangeGroup}
                            input={<Input name="group" id="group-label-placeholder"/>}
                            displayEmpty
                            name="group"
                            className={classes.selectEmpty}
                        >
                            <MenuItem value={null}>
                                <em>None</em>
                            </MenuItem>
                            {this.state.groupsData.map(group => (
                                <MenuItem value={group.group_id}>{group.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </form>
                <div className={classes.buttons}>
                    <Button
                        color="primary"
                        onClick={this.submit}
                    >
                        Submit
                    </Button>
                    <Button
                        color="secondary"
                        onClick={this.props.close}
                    >
                        Cancel
                    </Button>
                </div>

            </div>
        );
    }
}

UserModal.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserModal);
