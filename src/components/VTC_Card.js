import React, { Component } from 'react';
import { Card, Typography, Modal, Button } from 'antd';
import { Input, InputNumber, Tooltip, Icon, Radio } from 'antd';
import '../App.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectVTC, editVTC } from '../actions/VTC_Actions';

const { Title, Text } = Typography;


class VTC_Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedVTC: {},
            key: 'Common',
            modalIsVisible: false,
            modalIsLoading: false,

            vtc_id: "",
            common_name: "",
            whitelist: "",
            user_auth: "",
            reg_required: "",
            netflow_index: null,
            home_dps: "",
            nic_rl_mbps: 0,
            exclude_tcp_ports: "",
            exclude_udp_ports: "",
            pm_enable: ""
        };

        this.tabList = [
            {
                key: 'Common',
                tab: 'Common',
            },
            {
                key: 'Advanced',
                tab: 'Advanced',
            },
        ];

        this.onChangeInt = this.onChangeInt.bind(this);
        this.onChangeString = this.onChangeString.bind(this);
        this.onChangeNic = this.onChangeNic.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedVTC) {
            if (!(typeof nextProps.selectedVTC.vtc_id == "undefined")) {
                this.setState({
                    selectedVTC: nextProps.selectedVTC,
                    vtc_id: nextProps.selectedVTC.vtc_id,
                    common_name: nextProps.selectedVTC.common_name,
                    whitelist: nextProps.selectedVTC.whitelist,
                    user_auth: nextProps.selectedVTC.user_auth,
                    reg_required: nextProps.selectedVTC.reg_required,
                    netflow_index: nextProps.selectedVTC.netflow_index,
                    home_dps: nextProps.selectedVTC.home_dps,
                    nic_rl_mbps: nextProps.selectedVTC.nic_rl_mbps,
                    exclude_tcp_ports: nextProps.selectedVTC.exclude_tcp_ports,
                    exclude_udp_ports: nextProps.selectedVTC.exclude_udp_ports,
                    pm_enable: nextProps.selectedVTC.pm_enable
                })
            }
        }
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

    onChangeRadio = name => ({ target: { value } }) => {
        this.setState({ [name]: value })
    }

    onSave(e) {
        this.setState({ modalIsLoading: true });
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

        this.props.editVTC(vtc);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => {
            this.setState({ modalIsLoading: false, modalIsVisible: false });
        }, 1800);

    }

    showModal = () => {
        this.setState({ modalIsVisible: true });
    }

    handleCancel = () => {
        this.setState({
            modalIsVisible: false,
            vtc_id: this.state.selectedVTC.vtc_id,
            common_name: this.state.selectedVTC.common_name,
            whitelist: this.state.selectedVTC.whitelist,
            user_auth: this.state.selectedVTC.user_auth,
            reg_required: this.state.selectedVTC.reg_required,
            netflow_index: this.state.selectedVTC.netflow_index,
            home_dps: this.state.selectedVTC.home_dps,
            nic_rl_mbps: this.state.selectedVTC.nic_rl_mbps,
            exclude_tcp_ports: this.state.selectedVTC.exclude_tcp_ports,
            exclude_udp_ports: this.state.selectedVTC.exclude_udp_ports,
            pm_enable: this.state.selectedVTC.pm_enable

        });
    };

    onTabChange = (key, type) => {
        this.setState({ [type]: key });
    };

    render() {
        const { modalIsVisible, modalIsLoading } = this.state;
        let contentList = {
            Common:
                <div>
                    <div className="row" style={{ textAlign: "left" }}>
                        <div className="column-2">
                            <p style={{ marginBottom: "0px" }}> Common Name: </p>
                            <h3 style={{ marginBottom: "6.2%" }}> {this.state.common_name} </h3>
                            <p style={{ marginBottom: "0px" }}> Current Zone ID: </p>
                            <h3 style={{ marginBottom: "6.2%" }}> {this.state.selectedVTC.current_zone_id} </h3>
                            <p style={{ marginBottom: "0px" }}> In Service </p>
                            <h3 style={{ marginBottom: "6.2%" }}> {this.state.selectedVTC.in_service} </h3>
                            <p style={{ marginBottom: "0px" }}> Mobility: </p>
                            <h3 style={{ marginBottom: "6.2%" }}> {this.state.selectedVTC.mobility} </h3>
                            <p style={{ marginBottom: "0px" }}> Port </p>
                            <h3 style={{ marginBottom: "6.2%" }}> {this.state.selectedVTC.port} </h3>
                            <p style={{ marginBottom: "0px" }}> Latitude </p>
                            <h3 style={{ marginBottom: "6.2%" }}> {this.state.selectedVTC.latitude} </h3>
                            <p style={{ marginBottom: "0px" }}> Longitude </p>
                            <h3 style={{ marginBottom: "6.2%" }}> {this.state.selectedVTC.longitude} </h3>
                        </div>
                        <div className="column-2" style={{ borderLeft: "#E7E7E7 1px solid", paddingLeft: "3.4%" }}>
                            <p style={{ marginBottom: "0px" }}> OS: </p>
                            <h3 style={{ marginBottom: "6.2%" }}> {this.state.selectedVTC.os} </h3>
                            <p style={{ marginBottom: "0px" }}> OS Type: </p>
                            <h3 style={{ marginBottom: "6.2%" }}> {this.state.selectedVTC.os_type} </h3>
                            <p style={{ marginBottom: "0px" }}> Last Activity: </p>
                            <h3 style={{ marginBottom: "6.2%" }}> {this.state.selectedVTC.last_activity} </h3>
                            <p style={{ marginBottom: "0px" }}> Last DPS: </p>
                            <h3 style={{ marginBottom: "6.2%" }}> {this.state.selectedVTC.last_dps} </h3>
                            <p style={{ marginBottom: "0px" }}> Last Changed: </p>
                            <h3 style={{ marginBottom: "6.2%" }}> {this.state.selectedVTC.last_changed} </h3>
                            <p style={{ marginBottom: "0px" }}> Last Login: </p>
                            <h3 style={{ marginBottom: "6.2%" }}> {this.state.selectedVTC.last_login} </h3>
                        </div>
                    </div>
                </div>,

            Advanced:
                <div>
                    <div className="row" style={{ textAlign: "left" }}>
                        <div className="column-2">
                            <p style={{ marginBottom: "0px" }}> IP: </p>
                            <h3 style={{ marginBottom: "6.2%" }}> {this.state.selectedVTC.ip} </h3>
                            <p style={{ marginBottom: "0px" }}> Authentication Key: </p>
                            <h3 style={{ marginBottom: "6.2%" }}> {this.state.selectedVTC.auth_key} </h3>
                            <p style={{ marginBottom: "0px" }}> Authentication Pin: </p>
                            <h3 style={{ marginBottom: "6.2%" }}> {this.state.selectedVTC.auth_pin} </h3>
                            <p style={{ marginBottom: "0px" }}> Authenticated: </p>
                            <h3 style={{ marginBottom: "6.2%" }}> {this.state.selectedVTC.authenticated} </h3>
                            <p style={{ marginBottom: "0px" }}> Service Groups: </p>
                            <h3 style={{ marginBottom: "6.2%" }}> {this.state.selectedVTC.serviceGroups} </h3>
                            <p style={{ marginBottom: "0px" }}> SNMP Index: </p>
                            <h3 style={{ marginBottom: "6.2%" }}> {this.state.selectedVTC.snmp_index} </h3>

                        </div>
                        <div className="column-2" style={{ borderLeft: "#E7E7E7 1px solid", paddingLeft: "3.4%" }}>
                            <p style={{ marginBottom: "0px" }}> WPI: </p>
                            <h3 style={{ marginBottom: "6.2%" }}> {this.state.selectedVTC.wpi} </h3>
                            <p style={{ marginBottom: "0px" }}> Version: </p>
                            <h3 style={{ marginBottom: "6.2%" }}> {this.state.selectedVTC.version} </h3>
                            <p style={{ marginBottom: "0px" }}> User ID: </p>
                            <h3 style={{ marginBottom: "6.2%" }}> {this.state.selectedVTC.user_id} </h3>
                            <p style={{ marginBottom: "0px" }}> User State: </p>
                            <h3 style={{ marginBottom: "6.2%" }}> {this.state.selectedVTC.user_state} </h3>
                            <p style={{ marginBottom: "0px" }}> Session Controllers: </p>
                            <h3 style={{ marginBottom: "6.2%" }}> {this.state.selectedVTC.sessionControllers} </h3>
                            <p style={{ marginBottom: "0px" }}> Deflects: </p>
                            <h3 style={{ marginBottom: "6.2%" }}> {this.state.selectedVTC.deflects}  </h3>
                            <p style={{ marginBottom: "0px" }}> Services: </p>
                            <h3> {this.state.selectedVTC.services}  </h3>
                        </div>
                    </div>
                </div>,
        };
        return (
            <div>
                <Title level={3} style={{ color: "white" }}> VTC Details </Title>
                <Card
                    style={{ marginTop: "3%" }}
                    title={<Title level={1}> {this.state.vtc_id} </Title>}
                    extra={(this.state.selectedVTC.vtc_id) ? <a onClick={this.showModal} style={{ fontSize: "17px" }}>Edit</a> : null}
                    tabList={this.tabList}
                    activeTabKey={this.state.key}
                    onTabChange={key => {
                        this.onTabChange(key, 'key');
                    }}
                >
                    {contentList[this.state.key]}
                </Card>

                <div>
                    <Modal
                        centered
                        visible={modalIsVisible}
                        title={"Editing VTC: " + this.state.vtc_id}
                        onOk={this.onSave}
                        onCancel={this.handleCancel}
                        footer={[
                            <Button key="back" onClick={this.handleCancel}>
                                Cancel
                            </Button>,
                            <Button key="submit" type="primary" loading={modalIsLoading} onClick={this.onSave}>
                                Save
                            </Button>,
                        ]}
                    >
                        <div style={{ textAlign: "center" }}>
                            <Title level={3}> Edit VTC </Title>
                            <div>
                                <Input
                                    disabled
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
                                    size="large"
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
                                            size="large"
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
                                            size="large"
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
                                            size="large"
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
                                            size="large"
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
                                            size="large"
                                            prefix={<Tooltip title="Must be either 'null' or a comma separated list of valid port numbers. ex. '80,81,1234'">
                                                <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                                            </Tooltip>}
                                        />
                                    </div>
                                </div>

                                <br />

                                <div className="row">
                                    <div className="column-3">
                                        <Text strong> PM Enable </Text>
                                        <Radio.Group defaultValue="no" size="medium" buttonStyle="solid" style={{ marginTop: "5%" }} value={this.state.pm_enable} onChange={this.onChangeRadio('pm_enable')}>
                                            <Radio.Button value="yes">Yes</Radio.Button>
                                            <Radio.Button value="no">No</Radio.Button>
                                        </Radio.Group>

                                        <br />
                                        <br />

                                    </div>
                                    <div className="column-3">
                                        <Text strong> Registration Required </Text>
                                        <Radio.Group defaultValue="no" size="medium" buttonStyle="solid" style={{ marginTop: "5%" }} value={this.state.reg_required} onChange={this.onChangeRadio('reg_required')}>
                                            <Radio.Button value="yes">Yes</Radio.Button>
                                            <Radio.Button value="no">No</Radio.Button>
                                        </Radio.Group>

                                        <br />
                                        <br />

                                    </div>
                                    <div className="column-3">
                                        <Text strong> User Authorization </Text>
                                        <Radio.Group defaultValue="no" size="medium" buttonStyle="solid" style={{ marginTop: "5%" }} value={this.state.user_auth} onChange={this.onChangeRadio('user_auth')}>
                                            <Radio.Button value="yes">Yes</Radio.Button>
                                            <Radio.Button value="no">No</Radio.Button>
                                        </Radio.Group>
                                    </div>
                                </div>
                            </div>

                            <Text strong style={{ paddingTop: "5%" }} > Whitelist </Text>
                            <Radio.Group defaultValue="off" size="medium" buttonStyle="solid" style={{ marginLeft: "2%" }} value={this.state.whitelist} onChange={this.onChangeRadio('whitelist')}>
                                <Radio.Button value="ingress">Ingress</Radio.Button>
                                <Radio.Button value="egress">Egress</Radio.Button>
                                <Radio.Button value="both">Both</Radio.Button>
                                <Radio.Button value="off">Off</Radio.Button>
                            </Radio.Group>
                        </div>
                    </Modal>
                </div>
            </div>
        );
    }
}

VTC_Card.propTypes = {
    selectVTC: PropTypes.func.isRequired,
    editVTC: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    vtcs: state.vtcs.vtcs, //from index.js in reducers
    selectedVTC: state.vtcs.sel_vtc
})


export default connect(mapStateToProps, { selectVTC, editVTC })(VTC_Card);