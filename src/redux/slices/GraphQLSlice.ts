import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  UnknownAction,
} from '@reduxjs/toolkit';
import { BASE_API_LINK, QUERY_TEMPLATE } from '../../shared/constants';
import { parseSchema } from '../../utils/parseSchema';
import { getIntrospectionQuery } from 'graphql';

export interface IError {
  id: number;
  message: string;
}

type InitialState = {
  apiLink: string;
  query: string;
  jsonViewer: string;
  errors: IError[];
  variables: string;
  headers: string;
  documentation: string;
  isDocsLoaded: boolean;
  isGraphQLDataLoading: boolean;
};

const initialState: InitialState = {
  apiLink: BASE_API_LINK,
  query: QUERY_TEMPLATE,
  jsonViewer: '',
  errors: [],
  variables: '',
  headers: '',
  documentation: '',
  isDocsLoaded: false,
  isGraphQLDataLoading: false,
};

type FetchJSONParams = {
  url: string;
  query: string;
  variables: string;
  headers: string;
};

type FetchSchemaParams = {
  url: string;
};

export const fetchJSON = createAsyncThunk<
  string,
  FetchJSONParams,
  { rejectValue: string }
>(
  'GraphQLSlice/fetchJSON',
  async ({ url, query, variables, headers }, { rejectWithValue }) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers
          ? {
              'Content-type': 'application/json',
              ...JSON.parse(headers),
            }
          : {
              'Content-type': 'application/json',
            },
        body: JSON.stringify(
          variables
            ? {
                query,
                variables: JSON.parse(variables),
              }
            : {
                query,
              }
        ),
      });
      if (!response.ok) {
        const message = (await response.json()).errors[0].message as string;
        return rejectWithValue(message);
      }
      const data = await response.json();
      return JSON.stringify(data, null, 4);
    } catch (error) {
      return rejectWithValue('Something went wrong!');
    }
  }
);

export const fetchSchema = createAsyncThunk<
  string,
  FetchSchemaParams,
  { rejectValue: string }
>('GraphQLSlice/fetchSchema', async ({ url }, { rejectWithValue }) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        query: getIntrospectionQuery(),
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      const message = (await response.json()).errors[0].message as string;
      return rejectWithValue(`Schema: ${message}`);
    }
    const schema = parseSchema(data.data.__schema.types);
    return JSON.stringify(schema, null, 4);
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(`Schema: ${error.message}`);
    }
    return rejectWithValue('`Schema: something went wrong!');
  }
});

const isError = (action: UnknownAction) => {
  return action.type.endsWith('rejected');
};

const GraphQLSlice = createSlice({
  name: 'GraphQL',
  initialState,
  reducers: {
    setApiLink(state, action: PayloadAction<string>) {
      state.apiLink = action.payload;
    },
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    setError(state, action: PayloadAction<IError[]>) {
      state.errors = action.payload;
    },
    setVariables(state, action: PayloadAction<string>) {
      state.variables = action.payload;
    },
    setHeaders(state, action: PayloadAction<string>) {
      state.headers = action.payload;
    },
    setDocumentation(state, action: PayloadAction<string>) {
      state.documentation = action.payload;
    },
    setIsDocsLoaded(state, action: PayloadAction<boolean>) {
      state.isDocsLoaded = action.payload;
    },
    setIsGraphQLDataLoading(state, action: PayloadAction<boolean>) {
      state.isGraphQLDataLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJSON.fulfilled, (state, action) => {
        state.jsonViewer = action.payload;
      })
      .addCase(fetchSchema.fulfilled, (state, action) => {
        state.documentation = action.payload;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        const error = {
          id: Date.now(),
          message: action.payload,
        };
        state.errors = [...state.errors, error];
      });
  },
});

export default GraphQLSlice.reducer;
export const {
  setApiLink,
  setQuery,
  setError,
  setVariables,
  setHeaders,
  setDocumentation,
  setIsDocsLoaded,
  setIsGraphQLDataLoading,
} = GraphQLSlice.actions;
