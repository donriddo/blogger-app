import React from 'react';
import { connect } from 'react-redux';

import { deserializeModel } from '../../_helpers';

class DetailView extends React.Component {

    render() {
        let { entryDetail } = this.props.entry;
        let record;
        if (entryDetail && entryDetail.data) record = deserializeModel(entryDetail.data);
        console.log({ record })
        return (
            <div>
                <h1>{record.headline}</h1>
                <small>PUBLISHED: {record.pubDate}</small><br/>
                <small>LAST MODIFIED: {record.modDate}</small>
                <h3>{record.bodyText}</h3><hr/>
                {
                    Object.keys(record)
                        .filter(r => !['headline', 'bodyText', 'pubDate', 'modDate'].includes(r) && !!record[r])
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