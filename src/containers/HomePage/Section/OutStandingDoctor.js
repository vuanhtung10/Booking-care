import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Slider from "react-slick";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
class OutStandingDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctors: [],
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
            this.setState({
                arrDoctors: this.props.topDoctorsRedux,
            });
        }
    }

    componentDidMount() {
        this.props.loadTopDoctors();
    }

    handleViewDetailDoctor = (doctor) => {
        console.log("view info", doctor);
        this.props.history.push(`/detail-doctor/${doctor.id}`);
    };

    render() {
        let arrDoctors = this.state.arrDoctors;
        console.log("check topdoctorredux", arrDoctors);
        return (
            <div>
                <div className="section-share section-outstanding-doctor">
                    <div className="section-container">
                        <div className="section-header">
                            <span className="title-section">
                                Bác sĩ nỗi bật tuần qua
                            </span>
                            <button className="btn-section">Xem thêm</button>
                        </div>
                        <div className="section-body">
                            <Slider {...this.props.settings}>
                                {arrDoctors &&
                                    arrDoctors.length > 0 &&
                                    arrDoctors.map((item, index) => {
                                        let imageBase64 = "";
                                        if (item.image) {
                                            imageBase64 = new Buffer(
                                                item.image,
                                                "base64"
                                            ).toString("binary");
                                        }
                                        console.log("item", item);
                                        let nameVi = `${item.lastName} ${item.firstName}`;
                                        let nameEn = `${item.firstName} ${item.lastName}`;
                                        let positionVi = `${item.positionData.valueVi} ${item.lastName} ${item.firstName}`;
                                        let positionEn = `${item.positionData.valueEn} ${item.firstName} ${item.lastName}`;
                                        let language = this.props.language;
                                        return (
                                            <div
                                                onClick={() => {
                                                    this.handleViewDetailDoctor(
                                                        item
                                                    );
                                                }}
                                                className="section-customize"
                                                key={index}
                                            >
                                                <div className="customize-border">
                                                    <div className="outer-bg">
                                                        <div
                                                            className="bg-image section-outstanding-doctor"
                                                            style={{
                                                                backgroundImage: `url(${imageBase64})`,
                                                            }}
                                                        ></div>
                                                    </div>
                                                    <div className="position text-center">
                                                        <div>
                                                            {language ===
                                                            LANGUAGES.VI
                                                                ? positionVi
                                                                : nameEn}
                                                        </div>
                                                        <div>
                                                            {language ===
                                                            LANGUAGES.VI
                                                                ? nameVi
                                                                : positionEn}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        topDoctorsRedux: state.admin.topDoctors,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadTopDoctors: () => {
            dispatch(actions.fetchTopDoctor());
        },
    };
};

export default withRouter(
    withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor))
);
