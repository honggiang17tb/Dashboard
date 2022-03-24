import { ActionType, createCustomAction, getType } from 'typesafe-actions';


export const setPayload = createCustomAction('payload/setPayload', (data:any) => ({
  data,
}));

const actions = { setPayload };

type Action = ActionType<typeof actions>;

export default function reducer(state: any = {}, action: Action) {
  switch (action.type) {

    case getType(setPayload):
      return action.data;

    default:
      return state;
  }
}
