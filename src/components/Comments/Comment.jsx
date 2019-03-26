import React from 'react';
import { connect } from 'react-redux';

import { ListView, DetailView } from '.';

class Comment extends React.Component {

    render() {
        const { view } = this.props.comment;
        
        return (
            <div>
                {
                    view && view === 'list' && <ListView />
                }
                {
                    view && view === 'detail' && <DetailView />
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

const connectedComment = connect(mapStateToProps)(Comment);
export { connectedComment as Comment };