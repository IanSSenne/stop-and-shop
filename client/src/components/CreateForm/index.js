import React from 'react';
import { FileInput, FormGroup, InputGroup, TextArea } from '@blueprintjs/core'
import { ADD_ITEM } from '../../utils/mutations';
 
function CreateForm () {
    const [newItem, setNewItem] = useState(''); 

    return (
        <>
            <h1> Create Form</h1>
            <section>
                <article>
                    <h1>Add Your Title</h1>
                    <InputGroup
                        placeholder='Enter the title of your new item...'
                        type='text'
                    />
                    <h1>Add Your Description</h1>
                    <TextArea 
                        placeholder='Description'
                    />
                </article>
                <article>
                <   FileInput text="Choose file..." buttonText="Upload"  />
                </article>
            </section>
        </>
    );
}

export default CreateForm;