import { FormGroup, Input, Label } from '@adminjs/design-system';
import { PropertyJSON, RecordJSON } from 'adminjs';
import React from 'react';

type TextAreaProps = {
    property: PropertyJSON;
    record: RecordJSON;
    onChange: (name: string, value: unknown) => void;
};

function TextArea({ property, record, onChange }: TextAreaProps) {
    return (
        <FormGroup>
            <Label>{property.label.charAt(0).toUpperCase() + property.label.slice(1)}</Label>
            <Input
                as="textarea"
                style={{ width: '100%', height: '150px', resize: 'vertical' }}
                value={record.params[property.name] || ''}
                onChange={(e) => onChange(property.name, e.target.value)}
            />
        </FormGroup>
    );
}

export default TextArea;
