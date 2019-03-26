import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import OverlayLoader from 'react-loading-indicator-overlay/lib/OverlayLoader'

import { rootActions } from '../../_actions';
import { SideBar } from '.';
import { Blog } from '../Blogs';
import { Author } from '../Authors';
import { Comment } from '../Comments';
import { Entry } from '../Entries';

class Dashboard extends React.Component {

    componentDidMount() {
        this.props.dispatch(rootActions.getModels());
    }

    render() {
        const { currentModelName, showLoader } = this.props.root;

        return (
            <div className="container">
                <nav className="navbar navbar-inverse navbar-fixed-top">
                    <div className="container">
                        <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="#">Blogger</a>
                        </div>
                        <div id="navbar" className="navbar-collapse collapse">
                        <ul className="nav navbar-nav navbar-right">
                            <li><Link to="/">Logout</Link></li>
                        </ul>
                        <form className="navbar-form navbar-right">
                            <input type="text" className="form-control" placeholder="Filter Records..." />
                        </form>
                        </div>
                    </div>
                </nav>
                <div className="row">
                    <SideBar />
                    <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
                        <h1 className="page-header">Dashboard</h1>

                        { currentModelName && currentModelName === 'blogs' && <Blog /> }
                        { currentModelName && currentModelName === 'authors' && <Author /> }
                        { currentModelName && currentModelName === 'comments' && <Comment /> }
                        { currentModelName && currentModelName === 'entries' && <Entry /> }
                        <OverlayLoader 
                            color={'blue'}
                            loader="ScaleLoader"
                            text="Loading... Please wait!" 
                            active={showLoader} 
                            backgroundColor={'black'}
                            >
                                <p></p>
                        </OverlayLoader>
                    </div>
                </div>
      
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { root } = state;
    return {
        root
    };
}

const connectedDashboard = connect(mapStateToProps)(Dashboard);
export { connectedDashboard as Dashboard };