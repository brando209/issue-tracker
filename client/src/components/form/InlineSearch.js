import React from 'react'
import { Form, FormControl, Button } from 'react-bootstrap';

function InlineSearch(props) {
    const handleSubmit = (e) => {
        e.preventDefault();
        props.onSubmit(e.target.firstChild.value);
    }

    return (
        <Form inline noValidate onSubmit={handleSubmit} className={props.className}>
            <FormControl type="text" name="search" placeholder="Search" className="mr-sm-2" />
            <Button type="submit" variant="outline-info">Search</Button>
        </Form>
    )

}

export default InlineSearch;