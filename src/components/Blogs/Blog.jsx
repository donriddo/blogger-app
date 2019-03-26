import React from 'react';
import { connect } from 'react-redux';

import { ListView, DetailView } from '.';

class Blog extends React.Component {

    render() {
        const { view } = this.props.blog;
        
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
    const { blog } = state;
    return {
        blog,
    };
}

const connectedBlog = connect(mapStateToProps)(Blog);
export { connectedBlog as Blog };