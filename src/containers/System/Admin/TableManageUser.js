import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableManageUser.scss";
import * as actions from "../../../store/actions";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
    console.log("handleEditorChange", html, text);
}

class TableManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userRedux: [],
        };
    }

    async componentDidMount() {
        this.props.fetchUsersRedux();
    }

    componentDidUpdate(prveProps, prevState, snapshot) {
        if (prveProps.listUsers !== this.props.listUsers) {
            this.setState({
                userRedux: this.props.listUsers,
            });
        }
    }

    handleDeleteUser = (user) => {
        this.props.deleteAUserRedux(user.id);
        console.log("hoidanit delete user", user);
    };

    handleEditUser = (user) => {
        this.props.handleEditUserFromParentKey(user);
    };

    render() {
        console.log("hoi dan it check all users", this.props.listUsers);
        let arrUsers = this.state.userRedux;
        return (
            <React.Fragment>
                <div className="users-container">
                    <div className="users-table mt-4 mx-1">
                        <table id="TableManageUser">
                            <thead>
                                <tr>
                                    <th>Email</th>
                                    <th>First name</th>
                                    <th>Last name</th>
                                    <th>Address</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {arrUsers &&
                                    arrUsers.length > 0 &&
                                    arrUsers.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{item.email}</td>
                                                <td>{item.firstName}</td>
                                                <td>{item.lastName}</td>
                                                <td>{item.address}</td>
                                                <td>
                                                    <button
                                                        className="btn-edit"
                                                        onClick={() =>
                                                            this.handleEditUser(
                                                                item
                                                            )
                                                        }
                                                    >
                                                        <i className="fas fa-pencil-alt"></i>
                                                    </button>
                                                    <button
                                                        className="btn-delete"
                                                        onClick={() =>
                                                            this.handleDeleteUser(
                                                                item
                                                            )
                                                        }
                                                    >
                                                        <i className="fas fa-trash-alt"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <MdEditor
                    style={{ height: "500px" }}
                    renderHTML={(text) => mdParser.render(text)}
                    onChange={handleEditorChange}
                />
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        listUsers: state.admin.users,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUsersRedux: () => dispatch(actions.fetchAllUsersStart()),
        deleteAUserRedux: (id) => dispatch(actions.deleteAUser(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
