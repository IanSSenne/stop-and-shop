import React from 'react';
import { FileInput, FormGroup, InputGroup, TextArea, ButtonGroup, Button } from '@blueprintjs/core'
import { ADD_ITEM } from '../../utils/mutations';
 
function CreateForm () {

    return (
        <>
            <h1> Create Form</h1>
            <section>
                <article>
                    <h1>Item Title</h1>
                    <InputGroup
                        placeholder='Enter the title of your new item...'
                        type='text'
                    />
                    <h1>Item Price</h1>
                    <InputGroup 
                        placeholder='Enter the price of your new item...'
                    />
                    <h1>Item Description</h1>
                    <TextArea 
                        placeholder='Description...'
                    />
                    <h1>Tags</h1>
                    <InputGroup 
                        placeholder='Add tags...'
                    />
                    <h1>Location</h1>
                    <InputGroup
                        placeholder='Enter your location...'
                    />
                </article>
                <article>
                    <h1>Add Item Images</h1>
                    <FileInput text="Choose file..." icon="Document" buttonText="Upload..."  />
                    <h1>Sell Your New Item</h1>
                    <Button text='CONFIRM' rightIcon="tick"/>
                </article>
            </section>
        </>
    );
}

export default CreateForm;