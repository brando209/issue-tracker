import React from 'react'
import { Form, FormControl, Button } from 'react-bootstrap';

function InlineSearch(props) {
    const handleSubmit = (e) => {
        e.preventDefault();
        props.onSubmit(e.target.firstChild.value);
    }

    return (
        <Form inline noValidate onSubmit={handleSubmit} className={props.className} style={{ alignItems: "flex-start", paddingTop: "0.25rem", flexWrap: "nowrap" }}>
            <FormControl type="text" name="search" placeholder="Search" className="ml-2 mr-1"/>
            <Button type="submit" variant="outline-info" className="mx-1">Search</Button>
        </Form>
    )

}

export default InlineSearch;