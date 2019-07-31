import React, { Component } from 'react';
import Tree from 'react-tree-graph';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchVTCS } from '../actions/VTC_Actions';
import 'react-tree-graph/dist/style.css'
import '../App.css'

let data = {
    name: 'Parent',
    children: [
        {
            name: 'Child 1',
            children: [{ name: 'Child 3 ' }, { name: 'Child 4 ' }, { name: 'Child 5 ' }, { name: 'Child 6 ' }]
        }
        , { name: 'Child 2' }
    ]
};

class TreeView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vtcs: [],
            vtcsOnDisplay: [], //need 2 different kinds of VTC arrays for search functionality
            loaded: false
        }
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

            }
        }
    }

    render() {
        if (!this.state.loaded) {
            for (let i = 0; i < this.props.vtcs.length; i++) {
                this.state.vtcsOnDisplay.push(this.props.vtcs[i]);
                this.state.vtcs.push(this.props.vtcs[i].vtc_id);
            }
            console.log(this.state.vtcs)
            if (this.state.vtcs.length != 0) {
                this.setState({ loaded: true })
            }
        }
        // {/* <Tree /> will fill width/height of its container; in this case `#treeWrapper` */ }
        return (
            <div className="custom-container">
                <Tree
                    animated
                    data={data}
                    height={800}
                    width={1200}
                    svgProps={{
                        className: 'custom'
                    }} />
            </div>


        )
    }
}

TreeView.propTypes = {
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

export default connect(mapStateToProps, { fetchVTCS })(TreeView);