import React from 'react';
import PropTypes from 'prop-types';
import axios from "axios";

import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
});

class UsersTable extends React.Component {
    render() {
        const {usersData, openModal, deleteUser} = this.props;
        return (
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nickname</TableCell>
                            <TableCell>Group</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {usersData.map(row => (
                            <TableRow key={row.user_id}>
                                <TableCell>{row.user_id}</TableCell>
                                <TableCell>{row.nickname}</TableCell>
                                <TableCell>{row.group_name}</TableCell>
                                <TableCell align="center">
                                    <Button
                                        color="primary"
                                        onClick={() => openModal(row)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        color="secondary"
                                        onClick={() => deleteUser(row.user_id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        );
    };

}

UsersTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UsersTable);
