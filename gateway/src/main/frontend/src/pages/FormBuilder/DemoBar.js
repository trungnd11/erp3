import React from 'react';
import { ReactFormGenerator, ElementStore } from '../../Components/FormBuilder';
import { createFormTemplate } from '../../api/form-templates-api';
import { showErrorNotice, showSuccessNotice } from '../../utils/toastify';

export default class Demobar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
    };

    this._onUpdate = this._onChange.bind(this);
  }

  componentDidMount() {
    ElementStore.subscribe(state => this._onUpdate(state.data));
  }

  _onChange(data) {
    console.log("OnChange ",data);
    this.setState({
      data,
    });
  }

  _onSubmit() {
    console.log('onSubmit', this.state.data);
    this.setState({ loading: true })
    const template = [...this.state.data];
    const name = 'new form template'
    const value = [];
    const data = { name, template: JSON.stringify(template), value: JSON.stringify(value) };
    console.log(template);
    createFormTemplate(data).then(response => {
      showSuccessNotice("Create form successfully!");
      this.setState({ loading: false });
    }).catch(ex => {
      showErrorNotice("Create form error!");
      this.setState({loading: false})
    })

    // Place code to post json data to server here
  }

  render() {
    return (
      <div className="clearfix" style={{ margin: '10px', width: '70%' }}>
        <button className="btn btn-primary" style={{ marginRight: '10px' }} onClick={this._onSubmit.bind(this)}>Save Form</button>
      </div>
    );
  }
}
