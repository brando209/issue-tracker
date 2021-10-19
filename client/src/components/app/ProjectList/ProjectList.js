import React from 'react';

import List from '../../display/List/List';
import ProjectListOverviewCard from './ProjectListOverviewCard';
import './ProjectList.css';

function ProjectList({ projectList, ...props }) {
    return projectList ? 
        <List listItems={projectList} render={item => (
            <ProjectListOverviewCard project={item} {...props} />
        )}/> : 
        "No projects"
}

export default ProjectList;