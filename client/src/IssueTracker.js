import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import ProvideAuth from './contexts/AuthContext';
import ProvideProjects from './contexts/ProjectsContext';

import PrivateRoute from './utility/route/PrivateRoute';
import TopNavBar from './components/app/Navigation/TopNavBar';

import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import Dashboard from './pages/Dashboard/Dashboard';
import ProjectDashboard from './pages/ProjectDashboard/ProjectDashboard';
import UserAccountPage from './pages/UserAccountPage/UserAccountPage';
import NotificationBanner from './components/display/NotificationBanner/NotificationBanner';
import ProvideNotificationBanner from './contexts/NotificationBannerContext';

function IssueTracker() {

    return (
        <Router>
            <ProvideAuth>
                <ProvideProjects>
                    <ProvideNotificationBanner>
                        <NotificationBanner />
                        <TopNavBar />
                        <Switch>
                            <Route path="/login" component={LoginPage} />
                            <Route path="/signup" component={SignupPage} />
                            <PrivateRoute path="/dashboard" component={Dashboard} />
                            <PrivateRoute path="/projects" component={ProjectDashboard} />
                            <PrivateRoute path="/account" component={UserAccountPage} />
                            <PrivateRoute path="/" component={Dashboard} />
                        </Switch>
                    </ProvideNotificationBanner>
                </ProvideProjects>
            </ProvideAuth>
        </Router>
    )


}

export default IssueTracker;