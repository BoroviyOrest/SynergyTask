import React from 'react';
import { GroupsTable, GroupModal } from './';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import axios from "axios";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";


const styles = theme => ({
    button: {
        marginTop: '0.5rem',
        marginBottom: '0.5rem',
        left: '90%',
    },
});

class GroupsTab extends React.Component {
    state = {
        open: false,
        groupData: null,
        tableData: null,
    };

    componentDidMount() {
        this.getTableData();
    };

    getTableData = () => {
        const URL = 'api/v1/groups/';

        axios.get(URL)
            .then(response => {
                if (response.status === 200)
                    this.setState({tableData: response.data});
            })
            .catch(error => console.log(error));
    };

    deleteGroup = (group_id) => {
        const URL = 'api/v1/groups/';

        axios.delete(URL + group_id)
            .then(response => {
                if (response.status === 200) {
                    let groups = this.state.tableData.filter(group => group.group_id !== group_id);

                    this.setState({
                        tableData: groups
                    });
                }
            })
            .catch(error => console.log(error));
    };

    handleOpenCreate = () => {
        this.setState({open: true,
                       groupData: null});
    };

    handleOpenEdit = (groupData) => {
        this.setState({open: true,
                       groupData: groupData});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    render() {
        const groupsData = this.state.tableData;
        if (!groupsData)
            return null;

        return (
            <div>
                <Button
                    className={this.props.classes.button}
                    variant="outlined"
                    color="primary"
                    onClick={this.handleOpenCreate}
                >
                    Add group
                </Button>
               <GroupsTable
                   openModal={this.handleOpenEdit}
                   deleteGroup={this.deleteGroup}
                   groupsData={groupsData}
               />
               <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <GroupModal
                        close={this.handleClose}
                        reloadData={this.getTableData}
                        groupData={this.state.groupData}
                    />
                </Modal>
            </div>
        )
    }
}

GroupsTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GroupsTab);
