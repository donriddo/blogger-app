import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { deserializeModel } from '../../_helpers';
import { rootActions, blogActions } from '../../_actions';

class ListView extends React.Component {

    getPreviousPage() {
        let { blogList } = this.props.blog;
        if (blogList.links && blogList.links.prev) {
            this.props.dispatch(blogActions.getAll(blogList.links.prev));
        }
    }

    getNextPage() {
        let { blogList } = this.props.blog;
        if (blogList.links && blogList.links.next) {
            this.props.dispatch(blogActions.getAll(blogList.links.next));
        }
    }

    getLastPage() {
        let { blogList } = this.props.blog;
        if (blogList.links && blogList.links.last) {
            this.props.dispatch(blogActions.getAll(blogList.links.last));
        }
    }

    getFirstPage() {
        let { blogList } = this.props.blog;
        if (blogList.links && blogList.links.first) {
            this.props.dispatch(blogActions.getAll(blogList.links.first));
        }
    }

    render() {
        let { blogList } = this.props.blog;
        let records = [];
        if (blogList && blogList.data && blogList.data.length) {
            records = blogList.data;
            records = records.map((record, key) => {
                let data = deserializeModel(record);
                return (
                    <tr key={key}>
                        <td>{data.id}</td>
                        <td>{data.name}</td>
                        <td>{String(data.tags)}</td>
                        <td><button onClick={() => this.props.dispatch(blogActions.getOne(data.id))} type="button" className="btn btn-default">View</button></td>
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
                            <th>Tags</th>
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
                        <li onClick={this.getFirstPage.bind(this)} className={blogList.links && blogList.links.first ? "" : "disabled"}>
                            <a aria-label="First">
                                <span aria-hidden="true">First</span>
                            </a>
                        </li>
                        <li onClick={this.getPreviousPage.bind(this)} className={blogList.links && blogList.links.prev ? "" : "disabled"}><a>Previous</a></li>
                        {
                            blogList.meta
                            && blogList.meta.pagination
                            && blogList.meta.pagination.page
                            && <li><a>{blogList.meta.pagination.page}</a></li>
                        }
                        <li onClick={this.getNextPage.bind(this)} className={blogList.links && blogList.links.next ? "" : "disabled"}><a>Next</a></li>
                        <li onClick={this.getLastPage.bind(this)} className={blogList.links && blogList.links.last ? "" : "disabled"}>
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
    const { blog } = state;
    return {
        blog
    };
}

const connectedListView = connect(mapStateToProps)(ListView);
export { connectedListView as ListView };