import React from 'react';
import { connect } from 'react-redux';

import { deserializeModel } from '../../_helpers';

class DetailView extends React.Component {

    render() {
        let { commentDetail } = this.props.comment;
        let record;
        if (commentDetail && commentDetail.data) record = deserializeModel(commentDetail.data);
        console.log({ record })
        return (
            <div>
                <h1>{record.name}</h1>
                <small>{record.email}</small><br/><hr/>
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
    const { comment } = state;
    return {
        comment,
    };
}

const connectedDetailView = connect(mapStateToProps)(DetailView);
export { connectedDetailView as DetailView };