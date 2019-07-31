import React, { Component } from 'react'
import VTC_Form from './VTC_Form';
import VTC_Table from './VTC_Table';
import VTC_Card from './VTC_Card';

export default class VTC_Page extends Component {
    render() {
        return (
            <div style={{ marginLeft: "6.5%", marginRight: "6.5%" }}>
                <VTC_Table />
                <div className="row" style={{ marginTop: "1.5%" }}>
                    <div className="column-2" style={{ textAlign: "center", marginLeft: "2%", marginRight: "2%" }}>
                        <VTC_Card />
                    </div>
                    <div className="column-2" style={{ textAlign: "center", marginLeft: "2%", marginRight: "2%" }}>
                        <VTC_Form />
                    </div>
                </div>
            </div>
        )
    }
}
