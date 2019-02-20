import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
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
    textField: {
        marginRight: theme.spacing.unit,
        width: 200,
    },
});

class GroupModal extends React.Component {
    state = {
        name: '',
        description: '',
    };

    componentDidMount() {
        const group = this.props.groupData;
        if (group)
            this.setState({
                name: group.name,
                description: group.description,
            });
    };

    submit = () => {
        const group = this.props.groupData;
        if (group)
            this.updateGroup(group.group_id);
        else
            this.createGroup();
    };

    createGroup = () => {
        const URL = 'api/v1/groups/';

        axios.post(URL, {
            name: this.state.name,
            description: this.state.description,
        })
            .then(response => {
                if (response.status === 200) {
                    this.props.reloadData();
                    this.props.close();
                }
            })
            .catch(error => console.log(error));
    };

    updateGroup = (userId) => {
        const URL = 'api/v1/groups/';

        axios.put(URL + userId, {
            name: this.state.name,
            description: this.state.description,
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
        this.setState({name: event.target.value});
    };

    handleChangeDescription = (event) => {
        this.setState({description: event.target.value});
    };

    render() {
        const {classes, groupData} = this.props;

        return (
            <div className={classes.paper}>
                <Typography variant="h6" id="modal-title">
                    {groupData ? 'Edit' : 'Create'} group
                </Typography>
                <TextField
                    id="name"
                    className={classes.textField}
                    label="Name"
                    value={this.state.name}
                    onChange={this.handleChangeName}
                    margin="normal"
                />
                <TextField
                    id="standard-multiline-flexible"
                    label="Description"
                    multiline
                    rowsMax="4"
                    value={this.state.description}
                    onChange={this.handleChangeDescription}
                    className={classes.textField}
                    margin="normal"
                />
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

GroupModal.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GroupModal);
