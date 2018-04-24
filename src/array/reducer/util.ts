import { Actions } from '../../actions';
import { inferredStateReducer } from '../../inferred-reducer';
import { computeArrayState, FormArrayState, InferredControlState } from '../../state';

export function dispatchActionPerChild<TValue>(
  controls: ReadonlyArray<InferredControlState<TValue>>,
  actionCreator: (controlId: string) => Actions<TValue>,
): ReadonlyArray<InferredControlState<TValue>> {
  let hasChanged = false;
  const newControls = controls
    .map(state => {
      const newState = inferredStateReducer(state, actionCreator(state.id));
      hasChanged = hasChanged || state !== newState;
      return newState;
    });

  return hasChanged ? newControls : controls;
}

function callChildReducers<TValue>(
  controls: ReadonlyArray<InferredControlState<TValue>>,
  action: Actions<TValue[]>,
): ReadonlyArray<InferredControlState<TValue>> {
  let hasChanged = false;
  const newControls = controls
    .map(state => {
      const newState = inferredStateReducer(state, action);
      hasChanged = hasChanged || state !== newState;
      return newState;
    });

  return hasChanged ? newControls : controls;
}

export function childReducer<TValue>(state: FormArrayState<TValue>, action: Actions<TValue[]>) {
  const controls = callChildReducers(state.controls, action);

  if (state.controls === controls) {
    return state;
  }

  return computeArrayState(state.id, controls, state.value, state.errors, state.pendingValidations, state.userDefinedProperties);
}
