import React from 'react';
import C from '../constants';

class PostRoastNoteForm extends React.Component {

  componentDidUpdate(props) {
    componentHandler.upgradeDom();
  }

  noteInput() {
    let content = null;
    let autoFocus = false;

    if (this.props.editing) {
      autoFocus = true;
    }
    content = (
      <textarea
        className="mdl-textfield__input"
        type="text"
        id="postRoastNote"
        name="postRoastNote"
        rows="5"
        defaultValue={ this.props.postRoastNote }
        autoFocus={ autoFocus }
      >
      </textarea>
    );
    

    return content;
  }

  actionButton() {
    let content = null;

    if (this.props.editing === C.FIELD_STATUS_NOT_EDITING) {
      let btnText = 'Edit';

      if (this.props.postRoastNote === '') {
        btnText = 'Add Comment';
      }

      content = (
        <div className="mdl-card__actions">
          <button
            className="mdl-button mdl-button--colored mdl-js-button
                       mdl-js-ripple-effect"
            onClick={ () => {
                this.props.toggleEditing(
                  this.props.roastId,
                  C.FIELD_POST_ROAST_NOTE
                );
              } }
          >
            { btnText }
          </button>
        </div>
      );
    }

    return content;
  }

  noteForm() {
    let content = this.props.postRoastNote;


    if (this.props.editing === C.FIELD_STATUS_EDITING) {
      content = (
        <form onSubmit={ this.props.onSubmit }>

          <input
            type="hidden"
            defaultValue={ this.props.roastId }
            name="roastId"
            id="roastId"
          />

          <div className="bobon-textfield-wrapper bobon-util__full-width">
            <div className="mdl-textfield mdl-js-textfield">
              { this.noteInput() }
            </div>
          </div>

          <input
            className="mdl-button mdl-js-button mdl-js-ripple-effect"
            type="submit"
            value="Save Comment"
          />

          <button className="mdl-button mdl-js-button mdl-js-ripple-effect"
            onClick={ (e) => {
                e.preventDefault();
                this.props.toggleEditing(
                  this.props.roastId,
                  C.FIELD_POST_ROAST_NOTE
                );
              } }
          >
            Cancel
          </button>

        </form>
      );
    }

    return content;
  }

  render() {
    let content = null;

    if (this.props.status === C.ROAST_COMPLETED) {
      content = (
        <div className="mdl-card mdl-cell mdl-cell--12-col mdl-card
                        mdl-color--white bobon-card"
        >
          <div className="mdl-card__title">
            <h2 className="mdl-card__title-text">
              Post Roast Notes
            </h2>
          </div>

          <div className="mdl-card__supporting-text">
            <plaintext>
              { this.noteForm() }
            </plaintext>
          </div>

          { this.actionButton() }
        </div>
      );
    }

    return content;
  }
}

export default PostRoastNoteForm;