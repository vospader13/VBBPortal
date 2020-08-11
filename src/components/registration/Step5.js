import React from "react";

//Step 5

function Step5(props) {
  if (props.currentStep !== 5) {
    return null;
  }
  return (
    <React.Fragment>
      <div className="form-group step-form">
        <div>
          <h5>One last thing: How you can get more involved</h5>
          <label>
            Our organization is built by volunteers like you, and we need your
            help to spread hope through books.
          </label>
        </div>

        <div>
          <label>Would you like to get more involved?</label>
          <select
            name="moreInvolved"
            id="moreInvolved"
            value={props.moreInvolved}
            onChange={props.handleChange}
          >
            <option value="">-</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        {props.state.moreInvolved === "yes" && (
          <div>
            <label>
              How would you like to get more involved (Select all that apply)?
            </label>
            <select
              name="howInvolved"
              id="howInvolved"
              value={props.howInvolved}
              onChange={props.handleChange}
            >
              <option value="fundraiser"> Run or help with a fundraiser</option>
              <option value="ambassador">
                {" "}
                Be a social media advocate or an ambassador
              </option>
              <option value="startChapter">
                {" "}
                Start/Join a VBB Village Mentors Chapter at your school or
                company (A club of fellow mentors)
              </option>
              <option value="JoinClub"> Start/Join a Book Club</option>
              <option value="research"> Research</option>
              <option value="other"> Other</option>
            </select>
          </div>
        )}

        <label htmlFor="city">
          What city and state/province do you live in?
        </label>
        <input
          className="form-control"
          id="city"
          name="city"
          required
          type="text"
          placeholder="Philadelphia, PA"
          value={props.city}
          onChange={props.handleChange}
        />
      </div>

      <div style={{ "white-space": "pre-wrap", color: "red" }}>
        {props.hasProblems() && props.hasProblems()}
      </div>

      <button
        className="btn btn-success btn-block"
        disabled={props.hasProblems()}
        style={{ marginBottom: "20px", marginTop: "20px" }}
      >
        SIGN UP
      </button>
    </React.Fragment>
  );
}

export default Step5;
