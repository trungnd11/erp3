import React from 'react';
import { ElementStore } from '../../../../Components/FormBuilder';
export default class ListenChange extends React.Component {
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
    this.props.setData([...data]);
  }

  render() {
    return (
    <></>
    );
  }
}
