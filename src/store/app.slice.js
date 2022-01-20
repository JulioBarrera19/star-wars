import { createSlice } from "@reduxjs/toolkit";
import { FilmsService } from "../services/FilmsApi";

const initialState = {
  loading: false,
  listFilms: [],
  filmSelect: {},
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setListFilms: (state, action) => {
      state.listFilms = action.payload;
    },
    setFilmSelect: (state, action) => {
      state.filmSelect = action.payload;
    },
  },
});

export const { setLoading, setListFilms, setFilmSelect } = appSlice.actions;

export const getFilms = () => async (dispatch, getState) => {
  dispatch(setLoading(true));
  const resultado = await FilmsService.get();
  //console.log(resultado);
  if (resultado.status === 200) {
    dispatch(setListFilms(resultado.data.results));
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 1000);
  }
};

export const getFilmById = (episode_id) => async (dispatch, getState) => {
  const { listFilms } = getState().app;
  if (listFilms.length === 0) await dispatch(getFilms());
  dispatch(setFilmSelect({}));
  const resultado = await FilmsService.get(episode_id);
  //console.log(resultado);
  if (resultado.status === 200) {
    dispatch(setFilmSelect(resultado.data));
  }
};

export default appSlice.reducer;
