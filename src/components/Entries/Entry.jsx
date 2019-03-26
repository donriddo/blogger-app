import React from 'react';
import { connect } from 'react-redux';

import { ListView, DetailView } from '.';

class Entry extends React.Component {

    render() {
        const { view } = this.props.entry;
        
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
    const { entry } = state;
    return {
        entry,
    };
}

const connectedEntry = connect(mapStateToProps)(Entry);
export { connectedEntry as Entry };