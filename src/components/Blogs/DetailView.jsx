import React from 'react';
import { connect } from 'react-redux';

import { deserializeModel } from '../../_helpers';

class DetailView extends React.Component {

    render() {
        let { blogDetail } = this.props.blog;
        let record;
        if (blogDetail && blogDetail.data) record = deserializeModel(blogDetail.data);

        return (
            <div>
                <h1>{record.name}</h1>
                <h3>{String(record.tags)}</h3>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { blog } = state;
    return {
        blog,
    };
}

const connectedDetailView = connect(mapStateToProps)(DetailView);
export { connectedDetailView as DetailView };