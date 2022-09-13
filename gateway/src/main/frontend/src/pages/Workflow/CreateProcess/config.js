// @flow
import React from 'react';
import Task from './task/component';
import taskIcon from './task/icon';
import Event from './event/component';
import eventIcon from './event/icon';
import TaskBody from './task/TaskBody';

const EventBody = (props) => {
  const { action: Action, setOpen } = props;

  return (
    <React.Fragment>
      <div className='modal-body'>
        Event Body
      </div>
      <div className='modal-footer'>
        <button
            type="button"
            className="btn btn-light"
            onClick={() => setOpen(false)}
          >
            Close
        </button>
        {Action ? <Action /> : null}
      </div>
    </React.Fragment>
  )
}

const config = {
  entityTypes: {
    Task: {
      width: 125,
      height: 75,
      body: TaskBody,
    },
    Event: {
      width: 50,
      height: 50,
      body: EventBody,
    },
  },
  gridSize: 25,
};


const customEntities = {
  Task: {
    component: Task,
    icon: taskIcon,
    body: TaskBody,
  },
  Event: {
    component: Event,
    icon: eventIcon,
    body: EventBody,
  },
};

export { config, customEntities };
