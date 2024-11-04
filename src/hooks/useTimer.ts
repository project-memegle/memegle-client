import { useState, useEffect } from 'react';

const useTimer = (initialTime: number) => {
    const [timer, setTimer] = useState(initialTime);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (isActive && timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else if (timer === 0) {
            setIsActive(false);
            clearInterval(interval!);
        }
        return () => clearInterval(interval!);
    }, [isActive, timer]);

    const startTimer = () => {
        setIsActive(true);
        setTimer(initialTime);
    };

    const resetTimer = () => {
        setIsActive(false);
        setTimer(initialTime);
    };

    return { timer, startTimer, resetTimer, isActive };
};

export default useTimer;
