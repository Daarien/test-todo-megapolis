import { Reducer, Dispatch } from 'redux';
import { api_url, take, getParams, isOk } from '../utils/api';

// --------- actions -------- //
enum types {
  SET_LOADING = 'todo/SET_LOADING',
  SET_LIST = 'todo/SET_LIST',
  ADD_TASK = 'todo/ADD_TASK',
  EDIT_TASK = 'todo/EDIT_TASK',
  REMOVE_TASK = 'todo/REMOVE_TASK',
}

type LoadingAction = {
  type: types.SET_LOADING;
  loading: boolean;
};
type SetListAction = {
  type: types.SET_LIST;
  list: Task[];
};
type AddAction = {
  type: types.ADD_TASK;
  task: Task;
};
type EditAction = {
  type: types.EDIT_TASK;
  tasks: Task[];
};
type RemoveAction = {
  type: types.REMOVE_TASK;
  tasks: Task[];
};

export type Action =
  | LoadingAction
  | SetListAction
  | AddAction
  | EditAction
  | RemoveAction;

// --------- action creators -------- //
const loading = (state: boolean): LoadingAction => ({
  type: types.SET_LOADING,
  loading: state,
});
const setList = (list: Task[]): SetListAction => ({
  type: types.SET_LIST,
  list,
});
const add = (task: Task): AddAction => ({ type: types.ADD_TASK, task });

// --------- dispatcher -------- //
export type BaseResponse = {
  success: boolean;
  error: string;
};

type ListResponse = {
  data: Task[];
  length: number;
} & BaseResponse;

type AddResponse = {
  id: number;
} & BaseResponse;

export const dispatcher = {
  // GET
  getList: () => async (dispatch: Dispatch) => {
    dispatch(loading(true));
    const response = await take<ListResponse>(api_url);
    if (isOk(response)) {
      console.log('TCL: getList response', response);
      dispatch(setList(response.data));
    } else {
      dispatch(loading(false));
    }
  },
  // POST
  addTask: (title: string) => async (dispatch: Dispatch) => {
    dispatch(loading(true));
    const response = await take<AddResponse>(
      api_url,
      getParams('POST', { title })
    );
    if (isOk(response)) {
      const task: Task = { id: response.id, title };
      dispatch(add(task));
    } else {
      dispatch(loading(false));
    }
  },
  // POST
  editTask: (task: Task) => async (
    dispatch: Dispatch,
    getState: () => State
  ) => {
    dispatch(loading(true));
    const response = await take<BaseResponse>(
      `${api_url}/${task.id}`,
      getParams('POST', { title: task.title })
    );
    if (isOk(response)) {
      const list = getState().tasks.map(item =>
        task.id === item.id ? task : item
      );
      dispatch(setList(list));
    } else {
      dispatch(loading(false));
    }
  },
  // DELETE
  removeTask: (id: number) => async (
    dispatch: Dispatch,
    getState: () => State
  ) => {
    dispatch(loading(true));
    const response = await take<BaseResponse>(`${api_url}/${id}`, {
      method: 'DELETE',
    });
    if (isOk(response)) {
      const list = getState().tasks.filter(task => task.id !== id);
      dispatch(setList(list));
    } else {
      dispatch(loading(false));
    }
  },
};

type Task = {
  id: number;
  title: string;
};

export type State = {
  loading: boolean;
  tasks: Task[];
};

const initialState: State = {
  loading: false,
  tasks: [],
};

export const reducer: Reducer<State, Action> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case types.SET_LOADING:
      return { ...state, loading: action.loading };

    case types.SET_LIST:
      return { ...state, tasks: action.list, loading: false };

    case types.ADD_TASK:
      return { ...state, tasks: [...state.tasks, action.task], loading: false };

    case types.EDIT_TASK:
      return { ...state, tasks: action.tasks, loading: false };

    case types.REMOVE_TASK:
      return { ...state, tasks: action.tasks, loading: false };

    default:
      return state;
  }
};
