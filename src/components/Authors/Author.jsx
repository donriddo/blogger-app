import React from 'react';
import { connect } from 'react-redux';

import { ListView, DetailView } from '.';

class Author extends React.Component {

    render() {
        const { view } = this.props.author;
        
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
    const { author } = state;
    return {
        author,
    };
}

const connectedAuthor = connect(mapStateToProps)(Author);
export { connectedAuthor as Author };