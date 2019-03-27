import React from 'react';
import { connect } from 'react-redux';

import { deserializeModel } from '../../_helpers';

class DetailView extends React.Component {

    render() {
        let { authorDetail } = this.props.author;
        let record;
        if (authorDetail && authorDetail.data) record = deserializeModel(authorDetail.data);
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
    const { author } = state;
    return {
        author,
    };
}

const connectedDetailView = connect(mapStateToProps)(DetailView);
export { connectedDetailView as DetailView };