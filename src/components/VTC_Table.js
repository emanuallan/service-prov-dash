import React, { Component } from 'react';
import { Table, Input, Typography, Popconfirm, notification, Tag, Spin, message } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchVTCS, deleteVTC, selectVTC } from '../actions/VTC_Actions';
import { Login } from '../actions/LoginActions';
import '../App.css';

const { Title } = Typography;
const Search = Input.Search;

const deleteNotification = (vtc_id) => {
    message.warning('VTC: ' + vtc_id + ' has been deleted');
};

const editNotification = (vtc_id) => {
    message.success('VTC: ' + vtc_id + ' has been updated');
};

const createNotification = (vtc_id) => {
    message.success('VTC: ' + vtc_id + ' has been added');
};

class VTC_Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vtcs: [],
            vtcsOnDisplay: [], //need 2 different kinds of VTC arrays for search functionality
            loaded: false,
        }
        this.columns = [
            {
                title: 'State',
                width: 110,
                dataIndex: 'state',
                key: 'state',
                fixed: 'left',
                render: (status) => {
                    let color = (status === 'online') ? 'green' : 'volcano';
                    return (
                        <Tag color={color} key={status}>
                            {status.toUpperCase()}
                        </Tag>
                    );
                }
            },
            {
                title: 'VTC ID',
                width: 140,
                dataIndex: 'vtc_id',
                key: 'vtc_id',
                fixed: 'left',
                render: vtc_id => <a onClick={() => this.handleSelect(vtc_id)}> {vtc_id} </a>,
            },
            {
                title: 'Common Name',
                width: 140,
                dataIndex: 'common_name',
                key: 'common_name',
            },
            {
                title: 'Home DPS',
                dataIndex: 'home_dps',
                key: 'home_dps',
                width: 140,
            },
            {
                title: 'nic rl mbps',
                dataIndex: 'nic_rl_mbps',
                key: 'nic_rl_mbps',
                width: 140,
            },
            {
                title: 'Exclude TCP Ports',
                dataIndex: 'exclude_tcp_ports',
                key: 'exclude_tcp_ports',
                width: 140,
            },
            {
                title: 'Exclude UDP Ports',
                dataIndex: 'exclude_udp_ports',
                key: 'exclude_udp_ports',
                width: 140,
            },
            {
                title: 'Whitelist',
                dataIndex: 'whitelist',
                key: 'whitelist',
                width: 140,
            },
            {
                title: 'User Authorization',
                dataIndex: 'user_auth',
                key: 'user_auth',
                width: 130,
            },
            {
                title: 'PM Enable',
                dataIndex: 'pm_enable',
                key: 'pm_enable',
                width: 130,
            },
            {
                title: 'Registration Required',
                dataIndex: 'reg_required',
                key: 'reg_required',
                width: 130,
            },
            {
                title: 'Netflow Index',
                dataIndex: 'netflow_index',
                key: 'netflow_index',
                width: 'auto',
            },
            {
                title: 'Delete',
                key: 'operation',
                fixed: 'right',
                width: 80,
                render: (vtc) =>
                    (
                        <Popconfirm title="Sure to delete?" okType='danger' onConfirm={() => this.onDelete(vtc.vtc_id)} >
                            <a href="javascript:;">Delete</a>
                        </Popconfirm >
                    )
            },
        ];
        this.onDelete = this.onDelete.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    componentWillMount() {
        this.props.fetchVTCS();
    }

    componentWillReceiveProps(nextProps) {
        let editted = false;
        if (nextProps.newVTC) {
            if (!(typeof nextProps.newVTC.vtc_id == "undefined")) {

                for (var i = 0; i < this.state.vtcsOnDisplay.length; i++) {
                    if (this.state.vtcsOnDisplay[i].vtc_id == nextProps.newVTC.vtc_id) {
                        this.state.vtcsOnDisplay.splice(i, 1);
                        editted = true;
                    }
                }
                for (var i = 0; i < this.state.vtcs.length; i++) {
                    if (this.state.vtcs[i].vtc_id == nextProps.newVTC.vtc_id) {
                        this.state.vtcs.splice(i, 1);
                        editted = true;
                    }
                }

                this.state.vtcsOnDisplay.unshift(nextProps.newVTC);
                if (this.state.vtcs.length != this.state.vtcsOnDisplay.length) {
                    this.state.vtcs.unshift(nextProps.newVTC);
                }
                (editted) ? editNotification(nextProps.newVTC.vtc_id) : createNotification(nextProps.newVTC.vtc_id)

            }
        }
    }

    handleSelect = (vtc_id) => {
        window.scrollTo({ top: 2000, behavior: 'smooth' });
        this.props.selectVTC(vtc_id);
    }

    onDelete = (vtc_id) => {
        const del_vtc = {
            vtc_id: vtc_id
        }
        deleteNotification(vtc_id);
        this.props.deleteVTC(del_vtc);

        for (var i = 0; i < this.state.vtcsOnDisplay.length; i++) {
            if (this.state.vtcsOnDisplay[i].vtc_id == vtc_id) {
                this.state.vtcsOnDisplay.splice(i, 1);
            }
        }

        for (var i = 0; i < this.state.vtcs.length; i++) {
            if (this.state.vtcs[i].vtc_id == vtc_id) {
                this.state.vtcs.splice(i, 1);
            }
        }

        this.setState({ vtcs: this.state.vtcs });
    }

    handleChange = (e) => {
        let currentList = this.state.vtcs;
        let newList = [];

        if (e.target.value !== "") {
            newList = currentList.filter(v => {
                const v_lc = v.vtc_id.toLowerCase();
                const filter = e.target.value.toLowerCase();
                return v_lc.includes(filter);
            });
            this.setState({ vtcsOnDisplay: newList });
        } else {
            this.setState({ vtcsOnDisplay: currentList });
            return
        }
    }

    render() {
        console.log(this.props.AUTH_TOKEN);
        if (!this.state.loaded) {

            for (let i = 0; i < this.props.vtcs.length; i++) {
                this.state.vtcsOnDisplay.push(this.props.vtcs[i]);
                this.state.vtcs.push(this.props.vtcs[i]);
            }

            if (this.state.vtcsOnDisplay.length != 0) {
                this.setState({ loaded: true })
            }
        }

        return (
            <div>
                <div>
                    <Title level={2} style={{ float: "left", color: "white" }}> VTC's </Title>
                    <div style={{ textAlign: "right" }}>
                        <Search
                            placeholder="Search"
                            id="search_vtc"
                            onChange={this.handleChange}
                            style={{ width: 215 }}
                        />
                    </div>
                </div>
                <Table
                    columns={this.columns}
                    scroll={{ x: '130%', y: "max-content" }}
                    loading={!this.state.loaded}
                    dataSource={this.state.vtcsOnDisplay}
                />
            </div>
        )
    }
}

VTC_Table.propTypes = {
    selectVTC: PropTypes.func.isRequired,
    deleteVTC: PropTypes.func.isRequired,
    fetchVTCS: PropTypes.func.isRequired,
    vtcs: PropTypes.array.isRequired,
    newVTC: PropTypes.object,
    AUTH_TOKEN: PropTypes.object
}

const mapStateToProps = state => ({
    vtcs: state.vtcs.vtcs, //from index.js in reducers
    newVTC: state.vtcs.vtc,
    AUTH_TOKEN: state.login.session_token
})


export default connect(mapStateToProps, { fetchVTCS, deleteVTC, selectVTC })(VTC_Table);
