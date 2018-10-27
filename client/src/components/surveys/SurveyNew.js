//SurveyNew shows SurveyForm and SurveyFormReview

import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {
    state = {
        showSurveyReview: false
    }
    renderTemplate() {
        if (this.state.showSurveyReview) {
            return (<SurveyFormReview
                onCancel={() => this.setState({ showSurveyReview: false })}
            />
            )
        }

        return (
            <SurveyForm
                onSurveySubmit={() => this.setState({ showSurveyReview: true })}
            />
        )
    }

    render() {
        return (
            <div>
                {this.renderTemplate()}
            </div>
        )
    }
}

//clean all the form clear
export default reduxForm({
    form: 'surveyForm'
})(SurveyNew);









