import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {
    rootActions, blogActions,
    authorActions, commentActions, entryActions
} from '../../_actions';

const actions = {
    blogs: blogActions,
    authors: authorActions,
    comments: commentActions,
    entries: entryActions
};

class SideBar extends React.Component {

    selectModel(model) {
        this.props.dispatch(rootActions.selectModel(model));
        this.props.dispatch(actions[model.name].getAll(model.link));
    }

    render() {
        const { models, currentModelName } = this.props.root;
        let modelKeys;
        if (models) modelKeys = Object.keys(models);
        return (
            <div className="col-sm-3 col-md-2 sidebar">
                <ul className="nav nav-sidebar">
                    {
                        modelKeys &&
                        modelKeys.map(
                            (modelName, key) => (
                                <li className={currentModelName === modelName ? 'active' : ''} onClick={this.selectModel.bind(this, { name: modelName, link: models[modelName] })} key={key}>
                                    <a>{modelName.toUpperCase()}</a>
                                </li>
                            )
                        )
                    }
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { root } = state;
    return {
        root,
    };
}

const connectedSideBar = connect(mapStateToProps)(SideBar);
export { connectedSideBar as SideBar };