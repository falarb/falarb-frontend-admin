import { useState } from 'react';
import InputMask from 'react-input-mask';
import './styles.css';

export default function InputCPF({ label, type, name, value, onChange, placeholder }) {
    const [cpfInvalid, setCpfInvalid] = useState(false);

    const handleChange = (event) => {
        const val = event.target.value;
        onChange(event);

        const cleanCPF = val.replace(/\D/g, '');
        if (cleanCPF.length === 11) {
            setCpfInvalid(!validarCPF(cleanCPF));
        } else {
            setCpfInvalid(false);
        }
    };

    return (
        <div className="custom-input-mask">
            <label>{label}</label>
            <InputMask
                mask="999.999.999-99"
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={handleChange}
            >
                {(inputProps) => <input type={type} {...inputProps} className={`input-mask ${cpfInvalid ? 'invalid' : ''}`} />}
            </InputMask>
            {cpfInvalid && <span className="error-message">CPF inválido</span>}
        </div>
    );
}

function validarCPF(cpf) {
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let soma = 0;
    for (let i = 0; i < 9; i++) soma += parseInt(cpf[i]) * (10 - i);
    let digito1 = 11 - (soma % 11);
    if (digito1 >= 10) digito1 = 0;
    if (digito1 !== parseInt(cpf[9])) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(cpf[i]) * (11 - i);
    let digito2 = 11 - (soma % 11);
    if (digito2 >= 10) digito2 = 0;
    if (digito2 !== parseInt(cpf[10])) return false;

    return true;
}
