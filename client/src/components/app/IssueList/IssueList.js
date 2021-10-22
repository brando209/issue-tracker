import React from 'react';
import List from '../../display/List/List';
import IssueListOverviewCard from './IssueListOverviewCard';
import './IssueList.css';

const groups = { 
    priority: ['trivial', 'low', 'regular', 'high', 'critical'],
    category: ['other', 'task', 'feature', 'bug'],
    status: ['closed', 'resolved', 'inprogresss', 'open', 'unassigned'] 
}

function IssueList({ projectId, issueList, groupBy, orderBy, filter, searchText, searchKeys, ...props }) {
    return issueList && issueList.length > 0 ?
        <List
            listItems={issueList} 
            groupKey={groupBy}
            groupValues={groups[groupBy]}
            orderBy={orderBy}
            filter={filter}
            searchText={searchText}
            searchKeys={searchKeys}
            render={item => <IssueListOverviewCard projectId={projectId} issue={item} {...props} />}
        />
        : 
        <div className="empty-list-message">
            <span>There are currently no issues to display for this project. </span> 
            <a href="issues/new">Click here </a> 
            <span>to create an issue.</span>
        </div>
}

export default IssueList;