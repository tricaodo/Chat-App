/* eslint jsx-a11y/anchor-is-valid: 0 */
import React from "react";
import { connect } from "react-redux";
import { fetchService } from "../actions/serviceAction";
import Spinner from "../components/Spinner";
import ModalOffer from "../components/ModalOffer";
import requiredAuth from "../components/hoc/requiredAuth";
import { Redirect } from "react-router-dom";

class ServiceDetail extends React.Component {

    componentDidMount() {
        this.props.fetchService(this.props.match.params.id);
        
    }

    render() {
        console.log("=============================");
        if (this.props.isFetching) return <Spinner />
        const { service, auth } = this.props;
        if(!service) return <Redirect to="/" />
        return (
            <section className="section mt-6" style={{ paddingTop: "15rem" }}>
                <div className="container">
                    <div className="columns">
                        <div className="column">
                            <figure className="image is-4by3">
                                <img src={service.image} alt="Description"
                                    style={{ width: "70%", height: "70%" }} />
                            </figure>
                        </div>
                        <div className="column">
                            <div className="box">
                                <div className="columns">
                                    <div className="column"><i className="fas fa-dollar-sign is-size-3"></i><span
                                        className="has-text-weight-bold is-size-3">{service.price}</span> Per Hours</div>
                                    <div className="column">
                                        <div className="media">
                                            <div className="media-left">
                                                <figure className="image is-32x32">
                                                    <img className="is-rounded"
                                                        src={`${service.user.avatar}`}
                                                        alt={service.title} />

                                                </figure>
                                            </div>
                                            <div className="media-content">
                                                <span className="is-size-5">{service.user.fullName}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="column has-text-weight-medium"><i className="fas fa-list is-size-4"></i>: {service.category.toUpperCase()}</div>
                                </div>

                                <div className="columns">
                                    <div className="column">
                                        <h1 className="title has-text-centered">{service.title}</h1>
                                        <h3 className="subtitle mt-2 is-size-6">{service.description}</h3>

                                        <div className="has-text-centered">

                                            <ModalOffer service={service} auth={auth} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return { service: state.services[ownProps.match.params.id], auth: state.auth, isFetching: state.isFetching };
}

export default connect(mapStateToProps, {
    fetchService
})(requiredAuth(ServiceDetail));