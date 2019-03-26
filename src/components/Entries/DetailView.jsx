import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { deserializeModel } from '../../_helpers';
import { entryActions } from '../../_actions';

class DetailView extends React.Component {

    render() {
        let { entryDetail } = this.props.entry;
        let record;
        if (entryDetail && entryDetail.data) record = deserializeModel(entryDetail.data);
        console.log({ record })
        return (
            <div>
                <h1>{record.name}</h1>
                <small>{record.email}</small>
                <h4>DATA</h4>
                {
                    Object.keys(record)
                        .filter(r => !['name', 'email'].includes(r) && !!record[r])
                        .map((attr, key) => (
                            <h5 key={key}>{attr} - {record[attr]}</h5>
                        ))

                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { entry } = state;
    return {
        entry,
    };
}

const connectedDetailView = connect(mapStateToProps)(DetailView);
export { connectedDetailView as DetailView };