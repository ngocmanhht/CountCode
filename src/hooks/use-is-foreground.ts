import {useState} from 'react';
import {useEffect} from 'react';
import type {AppStateStatus} from 'react-native';
import {AppState} from 'react-native';

/**
 * A hook that returns true if the app is currently in the foreground, false otherwise.
 *
 * This hook uses AppState to detect whether the app is currently active or not.
 * It returns true if AppState is 'active', and false otherwise.
 *
 * @returns true if the app is currently in the foreground, false otherwise
 */
export const useIsForeground = (): boolean => {
  const [isForeground, setIsForeground] = useState(true);

  useEffect(() => {
    const onChange = (state: AppStateStatus): void => {
      setIsForeground(state === 'active');
    };
    const listener = AppState.addEventListener('change', onChange);
    return () => listener.remove();
  }, [setIsForeground]);

  return isForeground;
};
