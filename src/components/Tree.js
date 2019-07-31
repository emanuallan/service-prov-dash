import React, { useState, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchVTCS } from '../actions/VTC_Actions';
import Rorgchart from 'r-orgchart';
import OrgChart from 'rc-org-chart';
import '../lib/style';
import { Avatar, Icon, Menu, Dropdown, notification } from 'antd';
import '../App.css';
import S from './index.less';

const data = [
    {
        id: '001',
        department: 'Allan Serna',
        name: 'Allan Serna',
        position: 'CEO',
        employees: 13,
        avatar: "data:image/jpeg;base64,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",
        children: [
            {
                id: '002',
                department: 'Marketing',
                name: 'Regan Wood',
                position: 'CTO',
                employees: 2,
                avatar: 'http://img.zcool.cn/community/015cb758e4c8fda801219c770b4bf4.png',
                children: [
                    {
                        id: '003',
                        name: 'Lionel Reap',
                        avatar: 'http://s10.sinaimg.cn/middle/a3c11b85hcaaf6e8951f9&690',
                        position: 'Man',
                        department: 'Marketing',
                    },
                    {
                        id: '004',
                        name: 'John Wood',
                        avatar: 'http://n.sinaimg.cn/sinacn10107/530/w700h630/20190331/1743-huxwryw4256913.jpg',
                        position: 'John Wood',
                        department: 'John Wood',
                    },
                ]
            }, {
                id: '005',
                department: 'Finance',
                name: 'Jane Wood',
                position: 'CTO',
                avatar: 'http://p0.qhimgs4.com/t01056685f97cc37a9f.jpg',
                employees: 6,
                children: [
                    {
                        id: '006',
                        department: 'John Wood',
                        name: 'John Wood',
                        avatar: 'http://img4.imgtn.bdimg.com/it/u=1915294572,2691478166&fm=26&gp=0.jpg',
                        position: 'John Wood',
                        employees: 2,
                        children: [
                            {
                                id: '007',
                                name: 'John Wood',
                                avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555600582&di=17ecb175de50dd9ad946d02ccd9b36ee&imgtype=jpg&er=1&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fq_70%2Cc_zoom%2Cw_640%2Fimages%2F20180830%2F77ecca0d75fe4b82b0cc76d2012c2cfd.jpeg',
                                position: 'John Wood',
                                department: 'John Wood',
                            },
                            {
                                id: '008',
                                name: 'John Wood',
                                avatar: 'http://img.mp.itc.cn/upload/20160507/bc2167591044462f9d4f9cc2ce54299a_th.jpg',
                                position: 'John Wood',
                                department: 'John Wood',
                            },
                        ]
                    }, {
                        id: '009',
                        department: 'John Wood',
                        name: 'John Wood',
                        avatar: 'http://img3.duitang.com/uploads/item/201510/31/20151031235812_i3usj.thumb.700_0.jpeg',
                        position: 'John Wood',
                        employees: 2,
                        children: [
                            {
                                id: '010',
                                name: 'John Wood',
                                avatar: 'http://i0.hdslb.com/bfs/article/404cbb71b5baab83dca06a59b8eb063fb18f8856.jpg',
                                position: 'John Wood',
                                department: 'John Wood',
                            },
                            {
                                id: '011',
                                name: 'John Wood',
                                position: 'John Wood',
                                avatar: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3572739692,2115316078&fm=26&gp=0.jpg',
                                department: 'John Wood',
                            },
                        ]
                    }
                ],
            }, {
                id: '012',
                department: 'John Wood',
                name: 'John Wood',
                avatar: 'http://img1.imgtn.bdimg.com/it/u=670798554,27668845&fm=26&gp=0.jpg',
                position: 'John Wood',
                employees: 2,
                children: [
                    {
                        id: '013',
                        avatar: 'http://img2.imgtn.bdimg.com/it/u=170389182,436566452&fm=26&gp=0.jpg',
                        name: 'John Wood',
                        department: 'John Wood',
                    },
                    {
                        id: '014',
                        name: 'John Wood',
                        avatar: 'http://b-ssl.duitang.com/uploads/item/201703/20/20170320131919_4UQMP.jpeg',
                        department: 'John Wood',
                    },
                ]
            },
        ]
    }
]

const ExtraRender = props => {
    const { name } = props
    const [isName, setName] = useState(false)

    let render = <Icon type="question-circle" />
    if (isName) {
        render = <div>{name}</div>
    }
    return (
        <div onClick={() => setName(!isName)}>{render}</div>
    )
}

const NodeRender = props => {
    const { department, position, employees, avatar } = props
    const menuClick = () => {
        notification.info({
            message: 'Notification Title',
            description: 'Notification，Title',
        })
    }
    const menu = (
        <Menu onClick={menuClick}>
            <Menu.Item> Option A </Menu.Item>
            <Menu.Item> Option B </Menu.Item>
            <Menu.Item> Option C </Menu.Item>
            <Menu.Item> Option D </Menu.Item>
        </Menu>
    )
    return (
        <div className={S.nodeRender}>
            <div className="top">
                <span className="department">{department}</span>
                <Avatar size={28} src={avatar} />
            </div>
            <div className="bottom">
                <div className="mess">
                    <div>
                        <span className="title">Position: </span>
                        <span className="position">{position}</span>
                    </div>
                    {employees && (
                        <div>
                            <span className="title">Number of Employees: </span>
                            <span>{employees}</span>
                        </div>
                    )}
                </div>
                <div className="handleBar">
                    <Dropdown overlay={menu} placement="bottomLeft">
                        <span> ▾ </span>
                    </Dropdown>
                </div>
            </div>
        </div>
    )
}


class Tree extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div>
                <Rorgchart />
                <OrgChart
                    pan
                    zoom
                    draggable
                    data={data}
                    maxZoom={2}
                    minZoom={0.5}
                    zoomStep={0.0125}

                    nodeRender={props => <NodeRender {...props} />}
                    extraRender={props => <ExtraRender {...props} />}
                />
            </div>
        )
    }
}

Tree.propTypes = {
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

export default connect(mapStateToProps, { fetchVTCS })(Tree);