import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { deserializeModel } from '../../_helpers';
import { rootActions, entryActions } from '../../_actions';

class ListView extends React.Component {

    getPreviousPage() {
        let { entryList } = this.props.entry;
        if (entryList.links && entryList.links.prev) {
            this.props.dispatch(entryActions.getAll(entryList.links.prev));
        }
    }

    getNextPage() {
        let { entryList } = this.props.entry;
        if (entryList.links && entryList.links.next) {
            this.props.dispatch(entryActions.getAll(entryList.links.next));
        }
    }

    getLastPage() {
        let { entryList } = this.props.entry;
        if (entryList.links && entryList.links.last) {
            this.props.dispatch(entryActions.getAll(entryList.links.last));
        }
    }

    getFirstPage() {
        let { entryList } = this.props.entry;
        if (entryList.links && entryList.links.first) {
            this.props.dispatch(entryActions.getAll(entryList.links.first));
        }
    }

    render() {
        let { entryList } = this.props.entry;
        let records = [];
        if (entryList && entryList.data && entryList.data.length) {
            records = entryList.data;
            records = records.map((record, key) => {
                let data = deserializeModel(record);
                return (
                    <tr key={key}>
                        <td>{data.id}</td>
                        <td>{data.headline}</td>
                        <td>{data.bodyText}</td>
                        <td>{data.pubDate}</td>
                        <td>{data.modDate}</td>
                        <td><button onClick={() => this.props.dispatch(entryActions.getOne(data.id))} type="button" className="btn btn-default">View</button></td>
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
                            <th>Headline</th>
                            <th>Body Text</th>
                            <th>Publish Date</th>
                            <th>Last Modified</th>
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
                        <li onClick={this.getFirstPage.bind(this)} className={entryList.links && entryList.links.first ? "" : "disabled"}>
                            <a aria-label="First">
                                <span aria-hidden="true">First</span>
                            </a>
                        </li>
                        <li onClick={this.getPreviousPage.bind(this)} className={entryList.links && entryList.links.prev ? "" : "disabled"}><a>Previous</a></li>
                        {
                            entryList.meta
                            && entryList.meta.pagination
                            && entryList.meta.pagination.page
                            && <li><a>{entryList.meta.pagination.page}</a></li>
                        }
                        <li onClick={this.getNextPage.bind(this)} className={entryList.links && entryList.links.next ? "" : "disabled"}><a>Next</a></li>
                        <li onClick={this.getLastPage.bind(this)} className={entryList.links && entryList.links.last ? "" : "disabled"}>
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
    const { entry } = state;
    return {
        entry
    };
}

const connectedListView = connect(mapStateToProps)(ListView);
export { connectedListView as ListView };