import { useState } from 'react';
import DialogBox from '../components/display/DialogBox/DialogBox';

function extractInputValues(nodeList) {
    if(nodeList.length === 0) return {};
    const values = {};
    
    nodeList.forEach(input => { 
        values[input.name] = input.value;
    });

    return values;
}

function useDialogBox() {
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState({});

    const show = (data) => {
        setData(data);
        setVisible(true);
    }

    const hide = () => {
        setVisible(false);
    }

    const RenderDialogBox = (props) => {
        const handleSubmit = (event) => {
            const evt = event;
            evt.preventDefault();
            const values = evt.target.form && extractInputValues(evt.target.form.childNodes);
            typeof props.onSubmit === "function" && props.onSubmit({ data, values });
            hide();
        }

        return <DialogBox {...props} onSubmit={handleSubmit} show={visible} renderData={data} onClose={hide}/>
    };

    return {
        show, RenderDialogBox
    }
}

export default useDialogBox;