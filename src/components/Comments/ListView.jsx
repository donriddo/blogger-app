import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { deserializeModel } from '../../_helpers';
import { rootActions, commentActions } from '../../_actions';

class ListView extends React.Component {

    getPreviousPage() {
        let { commentList } = this.props.comment;
        if (commentList.links && commentList.links.prev) {
            this.props.dispatch(commentActions.getAll(commentList.links.prev));
        }
    }

    getNextPage() {
        let { commentList } = this.props.comment;
        if (commentList.links && commentList.links.next) {
            this.props.dispatch(commentActions.getAll(commentList.links.next));
        }
    }

    getLastPage() {
        let { commentList } = this.props.comment;
        if (commentList.links && commentList.links.last) {
            this.props.dispatch(commentActions.getAll(commentList.links.last));
        }
    }

    getFirstPage() {
        let { commentList } = this.props.comment;
        if (commentList.links && commentList.links.first) {
            this.props.dispatch(commentActions.getAll(commentList.links.first));
        }
    }

    render() {
        let { commentList } = this.props.comment;
        let records = [];
        if (commentList && commentList.data && commentList.data.length) {
            records = commentList.data;
            records = records.map((record, key) => {
                let data = deserializeModel(record);
                return (
                    <tr key={key}>
                        <td>{data.id}</td>
                        <td>{data.body}</td>
                        <td><button onClick={() => this.props.dispatch(commentActions.getOne(data.id))} type="button" className="btn btn-default">View</button></td>
                        <td><button type="button" className="btn btn-warning" data-toggle="modal" data-target="#editStory">Edit</button></td>
                    </tr>
                );
            });
        }
        return (
            <div>
                <h2 className="sub-header">
                    <button type="button" className="btn btn-success" data-toggle="modal" data-target="#newStory">
                        <span style={{ marginRight: 3 }} className="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
                        Add New Record
                    </button>
                </h2>
                <div className="table-responsive">
                    <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Body</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            records
                        }
                    </tbody>
                    </table>
                </div>
                <nav aria-label="Page navigation">
                    <ul className="pagination">
                        <li onClick={this.getFirstPage.bind(this)} className={commentList.links && commentList.links.first ? "" : "disabled"}>
                            <a aria-label="First">
                                <span aria-hidden="true">First</span>
                            </a>
                        </li>
                        <li onClick={this.getPreviousPage.bind(this)} className={commentList.links && commentList.links.prev ? "" : "disabled"}><a>Previous</a></li>
                        {
                            commentList.meta
                            && commentList.meta.pagination
                            && commentList.meta.pagination.page
                            && <li><a>{commentList.meta.pagination.page}</a></li>
                        }
                        <li onClick={this.getNextPage.bind(this)} className={commentList.links && commentList.links.next ? "" : "disabled"}><a>Next</a></li>
                        <li onClick={this.getLastPage.bind(this)} className={commentList.links && commentList.links.last ? "" : "disabled"}>
                            <a aria-label="Last">
                                <span aria-hidden="true">Last</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { comment } = state;
    return {
        comment
    };
}

const connectedListView = connect(mapStateToProps)(ListView);
export { connectedListView as ListView };