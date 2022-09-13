import React from 'react'
import styled from 'styled-components';
import { Diagram, store, setEntities, setConfig } from '../../Components/WorkflowDiagram';
import { config, customEntities } from './CreateProcess/config';
import data from './CreateProcess/data';

const Main = styled.main`
  padding: 1em;
  margin: 0 auto;
  font-family: sans-serif;
  display: flex;
  flex-flow: column nowrap;
  height: 100vh;
`;

class TaskWorkflow extends React.PureComponent {
  componentWillMount() {
    store.dispatch(setEntities(data));
    store.dispatch(setConfig(config));
  } 
  handleClick = () => {
    console.log(store.getState())
  }
  render() {
    return (
      <div className='page-content'>
        <Main>
          <button onClick={this.handleClick}> click </button>
          <h1>react-flow-diagram Demo</h1>
          <Diagram customEntities={customEntities} />
        </Main>
      </div>
    );
  }
}

export default TaskWorkflow;