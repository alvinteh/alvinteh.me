import { TypedUseSelectorHook, useDispatch as useDispatchRR, useSelector as useSelectorRR } from 'react-redux';

import type { RootState, AppDispatch } from './store'

export const useDispatch: () => AppDispatch = useDispatchRR;
export const useSelector: TypedUseSelectorHook<RootState> = useSelectorRR;