import { Input, FormGroup, Label } from "@adminjs/design-system";

const Textarea = (props) => {
  const { property, record, onChange } = props;

  return (
    <FormGroup>
      <Label>
        {property.label.charAt(0).toUpperCase() + property.label.slice(1)}
      </Label>
      <Input
        as="textarea"
        style={{ width: "100%", height: "150px", resize: "vertical" }}
        value={record.params[property.name] || ""}
        onChange={(e) => onChange(property.name, e.target.value)}
      />
    </FormGroup>
  );
};

export default Textarea;
