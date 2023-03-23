import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import logo from "../../assets/logo.svg";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils/constant";
import { withRouter } from "react-router";
import { changeLanguageApp } from "../../store/actions";

class HomeHeader extends Component {
    changeLanguage = (language) => {
        //fire redux event (actions)
        this.props.changeLanguageAppRedux(language);
    };

    returnHome = () => {
        this.props.history.push(`/home/`);
    };

    render() {
        let language = this.props.language;

        console.log("this check props", this.props);
        return (
            <React.Fragment>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            <i className="fas fa-bars"></i>
                            <img
                                onClick={() => this.returnHome()}
                                src={logo}
                                alt=""
                                className="header-logo"
                            />
                        </div>
                        <div className="center-content">
                            <div className="child-content">
                                <div>
                                    <b>
                                        <FormattedMessage id="home-header.speciality" />
                                    </b>
                                </div>
                                <div className="subs-title">
                                    <FormattedMessage id="home-header.search-doctor" />
                                </div>
                            </div>
                            <div className="child-content">
                                <div>
                                    <b>
                                        <FormattedMessage id="home-header.health-facility" />
                                    </b>
                                </div>
                                <div className="subs-title">
                                    <FormattedMessage id="home-header.select-room" />
                                </div>
                            </div>
                            <div className="child-content">
                                <div>
                                    <b>
                                        <FormattedMessage id="home-header.doctor" />
                                    </b>
                                </div>
                                <div className="subs-title">
                                    <FormattedMessage id="home-header.select-doctor" />
                                </div>
                            </div>
                            <div className="child-content">
                                <div>
                                    <b>
                                        <FormattedMessage id="home-header.fee" />
                                    </b>
                                </div>
                                <div className="subs-title">
                                    <FormattedMessage id="home-header.check-health" />
                                </div>
                            </div>
                        </div>
                        <div className="right-content">
                            <div className="support">
                                <i className="fas fa-question-circle">
                                    <FormattedMessage id="home-header.support" />
                                </i>
                            </div>
                            <div
                                className={
                                    language === LANGUAGES.VI
                                        ? "language-vi active"
                                        : "language-vi"
                                }
                            >
                                <span
                                    className="vn"
                                    onClick={() =>
                                        this.changeLanguage(LANGUAGES.VI)
                                    }
                                >
                                    VN
                                </span>
                            </div>
                            <div
                                className={
                                    language === LANGUAGES.EN
                                        ? "language-en active"
                                        : "language-en"
                                }
                            >
                                <span
                                    className="en"
                                    onClick={() =>
                                        this.changeLanguage(LANGUAGES.EN)
                                    }
                                >
                                    EN
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                {this.props.isShowbanner === true && (
                    <div className="home-banner-container">
                        <div className="content-up">
                            <div className="title1">
                                <FormattedMessage id="banner.title1" />
                            </div>
                            <div className="title2">
                                <FormattedMessage id="banner.title2" />
                            </div>
                            <div className="search">
                                <i className="fas fa-search"></i>
                                <input
                                    type="text"
                                    placeholder="tìm chuyên khoa khám bệnh"
                                />
                            </div>
                        </div>
                        <div className="content-down">
                            <div className="options">
                                <div className="option-child">
                                    <div className="icon-child">
                                        <i className="far fa-hospital"></i>
                                    </div>
                                    <div className="text-child">
                                        <FormattedMessage id="banner.child1" />
                                    </div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child">
                                        <i className="far fa-hospital"></i>
                                    </div>
                                    <div className="text-child">
                                        <FormattedMessage id="banner.child2" />
                                    </div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child">
                                        <i className="far fa-hospital"></i>
                                    </div>
                                    <div className="text-child">
                                        <FormattedMessage id="banner.child3" />
                                    </div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child">
                                        <i className="far fa-hospital"></i>
                                    </div>
                                    <div className="text-child">
                                        <FormattedMessage id="banner.child4" />
                                    </div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child">
                                        <i className="far fa-hospital"></i>
                                    </div>
                                    <div className="text-child">
                                        <FormattedMessage id="banner.child5" />
                                    </div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child">
                                        <i className="far fa-hospital"></i>
                                    </div>
                                    <div className="text-child">
                                        <FormattedMessage id="banner.child6" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </React.Fragment>
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
    return {
        changeLanguageAppRedux: (language) => {
            dispatch(changeLanguageApp(language));
        },
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
