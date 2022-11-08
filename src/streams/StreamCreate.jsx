import React from 'react';
import { Field, reduxForm } from "redux-form";

class StreamCreate extends React.Component {
  renderInput=({ input,label })=>{
    //console.log(formProps);
    return (
      <div className="">
        <label>{label}</label>
       <input {...input} />
      </div>
    );
  }

  onSubmit(formValue){
    console.log(formValue);
  }
  
  render() {
    console.log(this.props);
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form">
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field name="description" component={this.renderInput} label="Enter Description" />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }


}

export default reduxForm({
  form: 'streamCreate',
  validate
})(StreamCreate);