import classes from './MainPage.module.css';
import ApiLinkForm from '../../components/UI/ApiLinkForm/ApiLinkForm';
import { useAppDispatch, useAppSelector } from '../../hook/useRedux';
import {
  fetchJSON,
  fetchSchema,
  setApiLink,
  setError,
  setIsDocsLoaded,
} from '../../redux/slices/GraphQLSlice';
import EditorViewerSwitch from '../../components/EditorViewerSwitch/EditorViewerSwitch';
import { Suspense, lazy, useEffect } from 'react';
import Toasts from '../../components/Toasts/Toasts';

const Documentation = lazy(
  () => import('../../components/Documentation/Documentation')
);

function MainPage() {
  const { apiLink, query, errors, variables, headers, isDocsLoaded } =
    useAppSelector((store) => store.graphQL);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      dispatch(setIsDocsLoaded(false));
      const asyncThunkRequest = await dispatch(fetchSchema({ url: apiLink }));
      if (asyncThunkRequest.meta.requestStatus === 'fulfilled') {
        dispatch(setIsDocsLoaded(true));
      }
    })();
  }, [apiLink, dispatch]);

  const handleErrToastClose = (errorId: number) => {
    dispatch(setError(errors.filter((error) => error.id !== errorId)));
  };

  const clickSendButtonHandle = () => {
    dispatch(fetchJSON({ url: apiLink, query, variables, headers }));
  };

  const handleChangeURLBtnClick = (value: string) => {
    dispatch(setApiLink(value));
  };

  return (
    <div className={classes.wrapper}>
      {errors.length > 0 && (
        <Toasts toastsData={errors} handleErrToastClose={handleErrToastClose} />
      )}
      <div className={classes.row}>
        <Suspense>{isDocsLoaded && <Documentation />}</Suspense>
        <section className={classes.content}>
          <ApiLinkForm
            value={apiLink}
            submitHandler={handleChangeURLBtnClick}
          />
          <div className={classes.row}>
            <EditorViewerSwitch className={classes.queryResponseSection} />
            <section className={classes.controlPanel}>
              <button onClick={clickSendButtonHandle} disabled={!apiLink}>
                Send
              </button>
            </section>
            <EditorViewerSwitch
              className={classes.queryResponseSection}
              readOnly={true}
            />
          </div>
        </section>
      </div>
    </div>
  );
}

export default MainPage;
