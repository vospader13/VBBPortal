import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import * as actions from "../../store/actions/auth";
import moment from "moment";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import SuccessStep from "./SuccessStep";

class MasterForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      currentStep: 1,
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      vbbemail: "",
      newsletter: "",
      age: "",
      occupation: "",
      affiliation: "",
      referral_source: "",
      language: "",
      termsCond: "",
      charges: "",
      commit: "",
      initials: "",
      more_involved:"",
      desired_involvement: "",
      city: "",
      vbb_chapter: "",
      time_zone: moment.tz.guess(),
    };
  }

  hasProblems = () => {
    var base =
      "Please fix the following fields before submitting your application:\n";
    var problems = "";
    if (this.state.firstname === "") problems += " - first name\n";
    if (this.state.lastname === "") problems += " - last name\n";
    if (this.state.firstname.includes(' ')) problems += " - Please remove the space in your first name \n";
    if (this.state.lastname.includes(' ')) problems += " - Please remove the space in your last name \n";
    if (this.state.email === "") problems += " - email\n";
    if (this.state.age === "") problems += " - whether or not you are over 18\n";
    if (this.state.occupation === "") problems += " - what stage of life you are at\n";
    if (this.state.referral_source === "") problems += " - referral source\n";
    if (this.state.language === "") problems += " - language\n";
    if (this.state.time_zone === "") problems += " - time zone\n";
    if (this.state.termsCond === ""|| this.state.mentor4Months === "No") problems += " - accept Terms and Conditions\n";
    if (this.state.charges === "") problems += " - charged or \n";
    if (this.state.commit === "" || this.state.commit === "No")
      problems += " - mentoring commitment\n";
    if (this.state.initials === "") problems += " - initials\n";
    if (this.state.more_involved === "") problems += " - get more involved?\n";
    if (this.state.city === "") problems += " - city\n";
    if (problems === "") return false;
    return base + problems;
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
        [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      currentStep: 6
    })
    this.props.onAuth(
      this.state.firstname,
      this.state.lastname,
      this.state.time_zone,
      this.state.email,
      this.state.vbbemail,
      this.state.phone,
      this.state.occupation,
      this.state.affiliation,
      this.state.referral_source,
      this.state.desired_involvement,
      this.state.initials
    );
  };

  _next = () => {
    window.scrollTo(0, 0);
    let currentStep = this.state.currentStep;
    currentStep = currentStep >= 4 ? 5 : currentStep + 1;
    this.setState({
      currentStep: currentStep,
    });
  };

  _prev = () => {
    let currentStep = this.state.currentStep;
    currentStep = currentStep <= 1 ? 1 : currentStep - 1;
    this.setState({
      currentStep: currentStep,
    });
  };

  previousButton() {
    let currentStep = this.state.currentStep;
    if (currentStep !== 1) {
      return (
        <button
          className="btn btn-secondary prev-btn"
          type="button"
          onClick={this._prev}
        >
          PREVIOUS
        </button>
      );
    }
    return null;
  }

  nextButton() {
    let currentStep = this.state.currentStep;
    if (currentStep < 5) {
      return (
        <button
          className="btn btn-primary float-right next-btn"
          type="button"
          onClick={this._next}
        >
          NEXT
        </button>
      );
    }
    return null;
  }

  render() {
    return (
      <div className="signup-form">
        {
          this.state.currentStep < 6 ?
          <h1 id="signup-header">
            Mentor Registration: Step {this.state.currentStep} of 5
          </h1>
          :
          <h1 id="signup-header">
            Form Submitted!
          </h1>
        }
        <form onSubmit={this.handleSubmit}>
          <Step1
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            setState={this.setState}
            state={this.state}
          />

          <Step2
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            setState={this.setState}
            state={this.state}
          />

          <Step3
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            state={this.state}
          />

          <Step4
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            state={this.state}
          />

          <Step5
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            state={this.state}
            hasProblems={this.hasProblems}
          />

          <SuccessStep
            currentStep={this.state.currentStep}
            state={this.state}
          />

          {this.previousButton()}
          {this.nextButton()}
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (
      firstname,
      lastname,
      time_zone,
      email,
      vemail,
      phone,
      occupation,
      affiliation,
      referral_source,
      desired_involvement,
      initials
    ) =>
      dispatch(
        actions.authSignup(
          firstname,
          lastname,
          time_zone,
          email,
          vemail,
          phone,
          occupation,
          affiliation,
          referral_source,
          desired_involvement,
          initials
        )
      ),
  };
};

ReactDOM.render(<MasterForm />, document.getElementById("root"));
export default connect(null, mapDispatchToProps)(MasterForm);
