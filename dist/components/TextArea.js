import { FormGroup, Input, Label } from '@adminjs/design-system';
import React from 'react';
function TextArea({ property, record, onChange }) {
    return (React.createElement(FormGroup, null,
        React.createElement(Label, null, property.label.charAt(0).toUpperCase() + property.label.slice(1)),
        React.createElement(Input, { as: "textarea", style: { width: '100%', height: '150px', resize: 'vertical' }, value: record.params[property.name] || '', onChange: (e) => onChange(property.name, e.target.value) })));
}
export default TextArea;
