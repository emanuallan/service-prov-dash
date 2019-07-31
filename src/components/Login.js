import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox, Card } from 'antd';
import dispersive from "../img/dispersive-logo.jpg"; //15 17%
import '../App.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppHistory from '../routers/AppHistory';
import Particles from 'react-particles-js';
import { appLogin } from '../actions/LoginActions';

const particlesDesign = {
    particles: {
        number: {
            value: 75,
            density: {
                enable: true,
                value_area: 800
            }
        },
        size: {
            value: 3
        }
    },
    interactivity: {
        events: {
            onhover: {
                enable: true,

            },
            onclick: {
                enable: true,
                mode: "push"
            }
        }
    }
}

class NormalLoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
    }

    onChangeString = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    }


    handleSubmit = e => {

        this.props.form.validateFields((err, values) => {
            // all it does so far, reloads to /dash -> 
            // authentication doesnt actually work
            if (!err) {
                //e.preventDefault() -> if ya wanna see the error, uncomment this 
                console.log('Received values of form: ', values);
                console.log("your inquiry: " + this.props.appLogin(values));
                AppHistory.push("/dash");
            } else {
                e.preventDefault()
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="body">

                <div style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%"
                }}
                    className="Fade-in"
                >

                    <Particles params={particlesDesign} />

                </div>

                <Card style={{ width: '300px' }}>
                    <div style={{ textAlign: 'center' }} >
                        <img src={dispersive} alt="logo" style={{ height: '20vmin', marginBottom: "11%" }} />
                    </div>

                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('login', {
                                rules: [{ required: true, message: 'Please input your username' }],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Username"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password' }],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="Password"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {/* {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(<Checkbox>Remember me</Checkbox>)} */}
                            <div style={{ float: "right" }}>
                                <a href="">
                                    Forgot password
                            </a>
                            </div>

                            <div>
                                <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                                    Log in
                                </Button>
                            </div>

                            Or <a href="">register now!</a>
                        </Form.Item>
                    </Form>

                </Card>

            </div>
        );
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

WrappedNormalLoginForm.propTypes = {
    appLogin: PropTypes.func.isRequired
};

export default connect(null, { appLogin })(WrappedNormalLoginForm);