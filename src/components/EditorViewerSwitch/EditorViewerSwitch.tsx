import EditorTools from '../EditorTools/EditorTools';
import Loader from '../Loader/Loader';
import Textarea from '../UI/Textarea/Textarea';
import classes from './EditorViewerSwitch.module.css';
import useEditorViewerSwitch from './useEditorViewer';

interface IProps {
  onChange?: (value: string) => void;
  readOnly?: boolean;
  className?: string;
}

const EditorViewerSwitch = ({ readOnly, className }: IProps) => {
  const { query, jsonViewer, handleQueryEditorChange, isGraphQLDataLoading } =
    useEditorViewerSwitch();

  const renderJSONViewer = () => {
    return (
      <div
        className={`${classes.jsonViewer} ${className ? className : className}`}
      >
        {isGraphQLDataLoading ? (
          <Loader />
        ) : (
          <Textarea
            className={classes.textarea}
            readOnly={readOnly}
            value={jsonViewer}
          />
        )}
      </div>
    );
  };

  const renderQueryEditor = () => {
    return (
      <div
        className={`${classes.queryEditor} ${
          className ? className : className
        }`}
      >
        <Textarea
          className={classes.textarea}
          onChange={handleQueryEditorChange}
          readOnly={readOnly}
          value={query}
        />
        <EditorTools />
      </div>
    );
  };

  return readOnly ? renderJSONViewer() : renderQueryEditor();
};

export default EditorViewerSwitch;
