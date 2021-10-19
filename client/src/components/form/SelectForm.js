import React from 'react';
import { Formik, Form, Field } from 'formik';

function SelectForm({ formId, fieldName, selectItems, itemKey, initialValues, onSubmit }) {
    const selectOptions = selectItems.map((item, idx) => (
        <option id={`option${idx}`} key={`option${idx}`} value={item.id}>{item[itemKey]}</option>
    ));

    return(
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
        >
            {() => {
                return (
                    <Form id={formId}>
                        <Field name={fieldName} as="select">
                            {selectOptions}
                        </Field>
                    </Form>
                )
        }}
        </Formik>
    )
}

export default SelectForm;