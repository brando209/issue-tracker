import React, { useState } from 'react';
import { Dropdown, DropdownButton, ButtonGroup } from 'react-bootstrap';
import './IssueFilterControl.css';

function Checkmark({ checked, name, id, onClick }) {
    return (
        <div className="checkmark" id={id} name={name} onClick={onClick}>
            {checked ? "\u2713" : ""}
        </div>
    )
}

function IssueFilterControl(props) {
    const [isOpen, setOpen] = useState(false);

    const toggleShow = (open, event, meta) => {
        if(meta.source !== "select") setOpen(open);
    }

    const handleSelectGroup = (group) => {
        props.onSelect("group", group);
    }

    const handleSelectOrder = (order) => {
        props.onSelect("order", order);
    }

    const handleSelectFilter = (filter) => {
        const [filterKey, filterValue] = filter.split(" ");
        const newValues = { ...props.filters[filterKey] };
        newValues[filterValue] = !newValues[filterValue];
        const filters = { ...props.filters, [filterKey]: newValues };
        props.onSelect("filter", filters);
    }

    const setAllFiltersTo = (key, newValue) => {
        const filterKeys = Object.keys(props.filters);
        const filters = { ...props.filters };
        if(key === "") {
            filterKeys.forEach(filterKey => {
                Object.keys(props.filters[filterKey]).forEach(value => {
                    filters[filterKey][value] = newValue;
                });
            });
        } else {
            Object.keys(props.filters[key]).forEach(value => {
                filters[key][value] = newValue;
            });
        }
        props.onSelect("filter", filters);
    }

    const checkAllFilters = (key = "") => { setAllFiltersTo(key, true); }
    const uncheckAllFilters = (key = "") => { setAllFiltersTo(key, false); }

    const isCleared = (key = "") => {
        const filters = { ...props.filters };
        let cleared = true;
        if(key === "") {
            const filterKeys = Object.keys(props.filters);
            filterKeys.forEach(filterKey => {
                Object.keys(props.filters[filterKey]).forEach(value => {
                    if(filters[filterKey][value] === true) cleared = false;
                });
            });
        } else {
            Object.keys(props.filters[key]).forEach(value => {
                if(filters[key][value] === true) cleared = false;
            });
        }
        return cleared;
    }

    const handleToggleAll = () => {
        isCleared() ? checkAllFilters() : uncheckAllFilters()
    }

    const handleToggleFilterKey = (key) => {
        isCleared(key) ? checkAllFilters(key) : uncheckAllFilters(key)
    }

    return (
        <ButtonGroup className={props.className}>
            <DropdownButton className="m-1" variant="outline-primary" title="Group by" onSelect={handleSelectGroup}>
                <Dropdown.Item eventKey="none">None</Dropdown.Item>
                <Dropdown.Item eventKey="category">Category</Dropdown.Item>
                <Dropdown.Item eventKey="status">Status</Dropdown.Item>
                <Dropdown.Item eventKey="priority">Priority</Dropdown.Item>
            </DropdownButton>

            <DropdownButton className="m-1" variant="outline-primary" title="Order" onSelect={handleSelectOrder}>
                <Dropdown.Item eventKey="asc">Ascending</Dropdown.Item>
                <Dropdown.Item eventKey="desc">Desccending</Dropdown.Item>
            </DropdownButton>

            <DropdownButton show={isOpen} className="filterDropdown m-1" variant="outline-primary" title="Filter" menuAlign="right" onSelect={handleSelectFilter} onToggle={toggleShow}>
                <div className="filters">
                    <div className="dropdown-item-group">
                        <Dropdown.Header>Category</Dropdown.Header>
                        <Dropdown.Item eventKey="category bug">
                            <Checkmark name="bug" id="checkbox-bug" checked={props.filters.category.bug} />
                            <label htmlFor="checkbox-bug">Bug</label>
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="category feature">
                            <Checkmark name="feature" id="checkbox-feature" checked={props.filters.category.feature} />
                            <label htmlFor="checkbox-feature">Feature</label>
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="category task">
                            <Checkmark name="task" id="checkbox-task" checked={props.filters.category.task} />
                            <label htmlFor="checkbox-task">Task</label>
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="category other">
                            <Checkmark name="other" id="checkbox-other" checked={props.filters.category.other} />
                            <label htmlFor="checkbox-other">Other</label>
                        </Dropdown.Item>
                        <Dropdown.ItemText onClick={() => { handleToggleFilterKey("category") }}>{isCleared() ? "All" : "Clear"}</Dropdown.ItemText>
                    </div>
                    
                    <div className="dropdown-item-group">
                        <Dropdown.Header>Priority</Dropdown.Header>
                        <Dropdown.Item eventKey="priority critical">
                            <Checkmark name="critical" id="checkbox-critical" checked={props.filters.priority.critical} />
                            <label htmlFor="checkbox-critical">Critical</label>
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="priority high">
                            <Checkmark name="high" id="checkbox-high" checked={props.filters.priority.high} />
                            <label htmlFor="checkbox-high">High</label>
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="priority regular">
                            <Checkmark name="regular" id="checkbox-regular" checked={props.filters.priority.regular} />
                            <label htmlFor="checkbox-regular">Regular</label>
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="priority low">
                            <Checkmark name="low" id="checkbox-low" checked={props.filters.priority.low} />
                            <label htmlFor="checkbox-low">Low</label>
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="priority trivial">
                            <Checkmark name="trivial" id="checkbox-trivial" checked={props.filters.priority.trivial} />
                            <label htmlFor="checkbox-trivial">Trivial</label>
                        </Dropdown.Item>
                        <Dropdown.ItemText onClick={() => { handleToggleFilterKey("priority") }}>{isCleared() ? "All" : "Clear"}</Dropdown.ItemText>
                    </div>

                    <div className="dropdown-item-group">
                        <Dropdown.Header>Status</Dropdown.Header>
                        <Dropdown.Item eventKey="status unassigned">
                            <Checkmark name="unassigned" id="checkbox-unassigned" checked={props.filters.status.unassigned} />
                            <label htmlFor="checkbox-unassigned">Unassigned</label>
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="status open">
                            <Checkmark name="open" id="checkbox-open" checked={props.filters.status.open} />
                            <label htmlFor="checkbox-open">Open</label>
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="status inprogress">
                            <Checkmark name="inprogress" id="checkbox-inprogress" checked={props.filters.status.inprogress} />
                            <label htmlFor="checkbox-inprogress">In-progress</label>
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="status resolved">
                            <Checkmark name="resolved" id="checkbox-resolved" checked={props.filters.status.resolved} />
                            <label htmlFor="checkbox-resolved">Resolved</label>
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="status closed">
                            <Checkmark name="closed" id="checkbox-closed" checked={props.filters.status.closed} />
                            <label htmlFor="checkbox-closed">Closed</label>
                        </Dropdown.Item>
                        <Dropdown.ItemText onClick={() => { handleToggleFilterKey("status") }}>{isCleared() ? "All" : "Clear"}</Dropdown.ItemText>
                    </div>
                    <Dropdown.ItemText onClick={handleToggleAll}>{isCleared() ? "Check All" : "Clear All"}</Dropdown.ItemText>
                </div>
            </DropdownButton>
        </ButtonGroup>
    )
}

export default IssueFilterControl;