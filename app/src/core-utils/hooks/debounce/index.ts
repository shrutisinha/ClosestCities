import React from 'react';

export default function useDebounce(
    useEffectDeps: React.DependencyList | undefined,
    onDebounce: Function,
    delay: 1000,
) {
    React.useEffect(() => {
        const handler = setTimeout(() => {
            onDebounce();
        }, delay);
    }, useEffectDeps);

    return {}
}