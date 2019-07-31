import React, { Component } from 'react';
import '../App.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createVTC } from '../actions/VTC_Actions';
import { Input, InputNumber, Tooltip, Icon, Button, Radio, message } from 'antd';
import { Typography } from 'antd';

const { Title } = Typography;

class VTC_Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vtc_id: "",
            common_name: "default",
            whitelist: "off",
            user_auth: "no",
            reg_required: "no",
            netflow_index: null,
            home_dps: "dsx01",
            nic_rl_mbps: 0,
            exclude_tcp_ports: "80,81",
            exclude_udp_ports: "80,81",
            pm_enable: "no"
            // defaulting would just be a matter of leaving those blank
        };

        this.onChangeInt = this.onChangeInt.bind(this);
        this.onChangeString = this.onChangeString.bind(this);
        this.onChangeNic = this.onChangeNic.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeString(e) {
        this.setState({ [e.target.id]: e.target.value });
    }

    onChangeInt(e) {
        let val = Number(e.target.value);
        if (Number.isNaN(val)) {
            this.setState({ [e.target.id]: 'null' });
        } else {
            this.setState({ [e.target.id]: val });
        }
    }

    onChangeNic(e) {
        this.setState({ nic_rl_mbps: Number(e) });
    }

    onReset = () => {
        this.setState({
            vtc_id: "",
            common_name: "",
            whitelist: "off",
            user_auth: "no",
            reg_required: "no",
            netflow_index: null,
            home_dps: "",
            nic_rl_mbps: null,
            exclude_tcp_ports: "",
            exclude_udp_ports: "",
            pm_enable: "no"
        });
    }

    onChangeRadio = name => ({ target: { value } }) => {
        this.setState({ [name]: value })
    }

    onSubmit(e) {
        e.preventDefault();

        const vtc = {
            vtc_id: this.state.vtc_id,
            common_name: this.state.common_name,
            whitelist: this.state.whitelist,
            user_auth: this.state.user_auth,
            reg_required: this.state.reg_required,
            netflow_index: this.state.netflow_index,
            home_dps: this.state.home_dps,
            nic_rl_mbps: this.state.nic_rl_mbps,
            exclude_tcp_ports: this.state.exclude_tcp_ports,
            exclude_udp_ports: this.state.exclude_udp_ports,
            pm_enable: this.state.pm_enable
        }

        this.props.createVTC(vtc);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.onReset();
    }

    render() {
        return (
            <div>
                <Title level={3} style={{ color: "white" }}> Add VTC </Title>
                <div style={{ textAlign: "center" }}>
                    <Input
                        allowClear
                        placeholder="VTC ID"
                        id="vtc_id"
                        value={this.state.vtc_id}
                        onChange={this.onChangeString}
                        size="large"
                        prefix={
                            <Tooltip title="CHAR 64, Cannot be left empty">
                                <Icon type="project" style={{ color: 'rgba(0,0,0,.25)' }} /> '
                            </Tooltip>
                        }
                    />

                    <Input
                        allowClear
                        placeholder="Common Name"
                        id="common_name"
                        value={this.state.common_name}
                        onChange={this.onChangeString}

                        prefix={
                            <Tooltip title="Cannot have special characters">
                                <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                            </Tooltip>
                        }
                        style={{ marginTop: "3.9%" }}
                    />

                    <div className="row" style={{ marginTop: "7%" }}>

                        <div className="column-3">
                            <Input
                                allowClear
                                placeholder="Home DPS"
                                id="home_dps"
                                value={this.state.home_dps}
                                onChange={this.onChangeString}

                                prefix={<Tooltip title="Min length is 0. Max length is 63. Valid characters are [a-zA-Z0-9()+-./: ]">
                                    <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                                </Tooltip>}
                            />
                        </div>
                        <div className="column-3" style={{ marginLeft: "4%" }}>
                            {/* <InputNumber
                                placeholder="nic rl mbps"
                                id="nic_rl_mbps"
                                size="large"
                                min={0}
                                max={2000}
                                defaultValue={0}
                                onChange={this.onChangeNic}
                            /> */}

                            <Input
                                allowClear
                                placeholder="nic rl mbps"
                                id="nic_rl_mbps"
                                value={this.state.nic_rl_mbps}
                                onChange={this.onChangeInt}

                                prefix={
                                    <Tooltip title="Min nic_rl_mbps is 0. Max nic_rl_mbps is 2000.">
                                        <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                                    </Tooltip>
                                }
                            />
                        </div>
                        <div className="column-3" style={{ marginLeft: "4%", width: "100 %" }}>
                            <Input
                                allowClear
                                placeholder="Netflow Index"
                                id="netflow_index"
                                value={this.state.netflow_index}
                                onChange={this.onChangeInt}

                                prefix={
                                    <Tooltip title="Valid netflow_index values are 'null' for disabled or an index greater or equal to 0">
                                        <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                                    </Tooltip>
                                }

                            />

                        </div>
                    </div>

                    <div className="row" style={{ marginTop: "2.5%" }}>
                        <div className="column-2">
                            <Input
                                allowClear
                                placeholder="Exclude TCP Ports"
                                id="exclude_tcp_ports"
                                value={this.state.exclude_tcp_ports}
                                onChange={this.onChangeString}

                                prefix={<Tooltip title="Must be either 'null' or a comma separated list of valid port numbers. ex. '80,81,1234'">
                                    <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                                </Tooltip>}
                            />
                        </div>

                        <div className="column-2" style={{ marginLeft: "4%" }}>
                            <Input
                                allowClear
                                placeholder="Exclude UDP Ports"
                                id="exclude_udp_ports"
                                value={this.state.exclude_udp_ports}
                                onChange={this.onChangeString}

                                prefix={<Tooltip title="Must be either 'null' or a comma separated list of valid port numbers. ex. '80,81,1234'">
                                    <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                                </Tooltip>}
                            />
                        </div>
                    </div>

                    <br />

                    <div className="row">
                        <div className="column-3">
                            <Title level={4} style={{ color: "white" }}> PM Enable </Title>
                            <Radio.Group defaultValue="no" buttonStyle="solid" value={this.state.pm_enable} onChange={this.onChangeRadio('pm_enable')}>
                                <Radio.Button value="yes">Yes</Radio.Button>
                                <Radio.Button value="no">No</Radio.Button>
                            </Radio.Group>

                            <br />
                            <br />

                        </div>
                        <div className="column-3">
                            <Title level={4} style={{ color: "white" }}> Registration Required </Title>
                            <Radio.Group defaultValue="no" buttonStyle="solid" value={this.state.reg_required} onChange={this.onChangeRadio('reg_required')}>
                                <Radio.Button value="yes">Yes</Radio.Button>
                                <Radio.Button value="no">No</Radio.Button>
                            </Radio.Group>

                            < br />
                            <br />

                        </div>
                        <div className="column-3">
                            <Title level={4} style={{ color: "white" }}> User Authorization </Title>
                            <Radio.Group defaultValue="no" buttonStyle="solid" value={this.state.user_auth} onChange={this.onChangeRadio('user_auth')}>
                                <Radio.Button value="yes">Yes</Radio.Button>
                                <Radio.Button value="no">No</Radio.Button>
                            </Radio.Group>
                        </div>
                    </div>
                </div>

                <Title level={4} style={{ color: "white" }}> Whitelist </Title>
                <Radio.Group defaultValue="off" buttonStyle="solid" value={this.state.whitelist} onChange={this.onChangeRadio('whitelist')}>
                    <Radio.Button value="ingress">Ingress</Radio.Button>
                    <Radio.Button value="egress">Egress</Radio.Button>
                    <Radio.Button value="both">Both</Radio.Button>
                    <Radio.Button value="off">Off</Radio.Button>
                </Radio.Group>

                <br />
                <br />

                <div style={{ textAlign: "right" }}>
                    <Button type="normal" size="large" onClick={this.onReset} style={{ marginBottom: "13%", marginRight: "1.5%" }}> Reset </Button>
                    <Button type="primary" size="large" onClick={this.onSubmit} style={{ marginBottom: "13%" }}> Submit </Button>
                </div>
                <br />
            </div>
        );
    }
}

VTC_Form.propTypes = {
    createVTC: PropTypes.func.isRequired
};

export default connect(null, { createVTC })(VTC_Form);
