import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

class HomeFooter extends Component {
    render() {
        return (
            <div className="home-footer">
                <footer>
                    &copy; Copyright 2023 tung{" "}
                    <a href="#">
                        more information ,pls visit my youtube channel. click
                        here
                    </a>
                </footer>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
