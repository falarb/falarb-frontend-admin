import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import "./style.css";

export default function AutoCompleteCustom({
  name,
  options,
  onChange,
  solicitacao,
  title,
  label = "Selecione uma opção",
  required = false
}) {
  const selectedId = solicitacao?.[name] || "";
  const value = options?.find((opt) => opt.id === selectedId) || null;

  const handleChange = (event, newValue) => {
    const fakeEvent = {
      target: {
        name,
        value: newValue ? newValue.id : ""
      }
    };
    onChange(fakeEvent);
  };

  return (
    <div className="container-autocomplete-custom">
      <p className="label-autocomplete">
        {label}
        {required && <span className="required">*</span>}
      </p>

      <Autocomplete
        options={options || []}
        title={title}
        className="custom-autocomplete"
        getOptionLabel={(option) => option.nome || "Sem opções"}
        value={value}
        onChange={handleChange}
        renderInput={(params) => <TextField {...params} placeholder={label} />}
        isOptionEqualToValue={(opt, val) => opt.id === val.id}
      />
    </div>
  );
}
