import React from 'react';
import { connect } from 'react-redux';

import { deserializeModel } from '../../_helpers';
import { authorActions } from '../../_actions';

class ListView extends React.Component {

    getPreviousPage() {
        let { authorList } = this.props.author;
        if (authorList.links && authorList.links.prev) {
            this.props.dispatch(authorActions.getAll(authorList.links.prev));
        }
    }

    getNextPage() {
        let { authorList } = this.props.author;
        if (authorList.links && authorList.links.next) {
            this.props.dispatch(authorActions.getAll(authorList.links.next));
        }
    }

    getLastPage() {
        let { authorList } = this.props.author;
        if (authorList.links && authorList.links.last) {
            this.props.dispatch(authorActions.getAll(authorList.links.last));
        }
    }

    getFirstPage() {
        let { authorList } = this.props.author;
        if (authorList.links && authorList.links.first) {
            this.props.dispatch(authorActions.getAll(authorList.links.first));
        }
    }

    render() {
        let { authorList } = this.props.author;
        let records = [];
        if (authorList && authorList.data && authorList.data.length) {
            records = authorList.data;
            records = records.map((record, key) => {
                let data = deserializeModel(record);
                return (
                    <tr key={key}>
                        <td>{data.id}</td>
                        <td>{data.name}</td>
                        <td>{String(data.email)}</td>
                        <td><button onClick={() => this.props.dispatch(authorActions.getOne(data.id))} type="button" className="btn btn-default">View</button></td>
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
                            <th>Name</th>
                            <th>Email</th>
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
                        <li onClick={this.getFirstPage.bind(this)} className={authorList.links && authorList.links.first ? "" : "disabled"}>
                            <a aria-label="First">
                                <span aria-hidden="true">First</span>
                            </a>
                        </li>
                        <li onClick={this.getPreviousPage.bind(this)} className={authorList.links && authorList.links.prev ? "" : "disabled"}><a>Previous</a></li>
                        {
                            authorList.meta
                            && authorList.meta.pagination
                            && authorList.meta.pagination.page
                            && <li><a>{authorList.meta.pagination.page}</a></li>
                        }
                        <li onClick={this.getNextPage.bind(this)} className={authorList.links && authorList.links.next ? "" : "disabled"}><a>Next</a></li>
                        <li onClick={this.getLastPage.bind(this)} className={authorList.links && authorList.links.last ? "" : "disabled"}>
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
    const { author } = state;
    return {
        author
    };
}

const connectedListView = connect(mapStateToProps)(ListView);
export { connectedListView as ListView };