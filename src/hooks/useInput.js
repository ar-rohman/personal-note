import { useState } from 'react';

export function useInput(defaultValue = '') {
    const [value, setValue] = useState(defaultValue);

    const onValueChangeHandler = (event) => setValue(event.target.value);

    return [value, onValueChangeHandler];
}
