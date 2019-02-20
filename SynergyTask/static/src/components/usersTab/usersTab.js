import React from 'react';
import {UsersTable, UserModal} from './';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import axios from "axios";
import {GroupsTable} from "src/components/groupsTab";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";


const styles = theme => ({
    button: {
        marginTop: '0.5rem',
        marginBottom: '0.5rem',
        left: '90%',
    },
});

class UsersTab extends React.Component {
    state = {
        open: false,
        userData: null,
        tableData: null,
    };

    componentDidMount() {
        this.getTableData();
    };

    getTableData = () => {
        const URL = 'api/v1/users/';

        axios.get(URL)
            .then(response => {
                if (response.status === 200)
                    this.setState({tableData: response.data});
            })
            .catch(error => console.log(error));
    };

    deleteUser = (user_id) => {
        const URL = 'api/v1/users/';

        axios.delete(URL + user_id)
            .then(response => {
                if (response.status === 200) {
                    let users = this.state.tableData.filter(user => user.user_id !== user_id);

                    this.setState({
                        tableData: users
                    });
                }
            })
            .catch(error => console.log(error));
    };

    handleOpenCreate = () => {
        this.setState({open: true,
                       userData: null});
    };

    handleOpenEdit = (userData) => {
        this.setState({open: true,
                       userData: userData});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    render() {
        const usersData = this.state.tableData;
        if (!usersData)
            return null;

        return (
            <div>
                <Button
                    className={this.props.classes.button}
                    variant="outlined"
                    color="primary"
                    onClick={this.handleOpenCreate}
                >
                    Add user
                </Button>
                <UsersTable
                    openModal={this.handleOpenEdit}
                    deleteUser={this.deleteUser}
                    usersData={usersData}
                />
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <UserModal
                        close={this.handleClose}
                        reloadData={this.getTableData}
                        userData={this.state.userData}
                    />
                </Modal>
            </div>
        )
    }
}

GroupsTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UsersTab);
