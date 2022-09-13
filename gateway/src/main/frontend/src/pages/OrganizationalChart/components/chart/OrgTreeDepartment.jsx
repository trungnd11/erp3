/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/style-prop-object */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useLayoutEffect, useRef } from 'react';
import { OrgChart } from 'd3-org-chart';
import user from "../../../../assets/images/users/avatar-1.jpg";

function OrgTreeDepartment(props, ref) {
  const d3Container = useRef(null);
  let chart = null;

  function addNode(node) {
    chart.addNode(node);
  }

  props.setClick(addNode);

  // We need to manipulate DOM
  useLayoutEffect(() => {
    if (props.data && d3Container.current) {
      if (!chart) {
        chart = new OrgChart();
      }
      chart
        .container(d3Container.current)
        .data(props.data)
        .nodeWidth((d) => 250)
        .nodeHeight((d) => 170)
        .childrenMargin((d) => 40)
        .compactMarginBetween((d) => 15)
        .compactMarginPair((d) => 80)
        .onNodeClick((d, i, arr) => {
          props.onNodeClick(d);
        })
        .nodeContent((d, i, arr, state) => `
        <div class="style-tree-department" style="padding-top:30px;background-color:none;margin-left:1px;height:${d.height}px;overflow:visible">
          <div style="height:${d.height - 32}px;padding-top:0px;background-color:white;border:.1px solid lightgray;">
          <img src=" ${d.data.manager.avatarPic || user}" style="margin-top:-30px;margin-left:${d.width / 2 - 30}px;border-radius:100px;width:60px;height:60px;" />
          <div class="div-plus" style="padding: 5px;border-radius: 0 0 0 6px;background: #cccccc69;margin-top:7px;float:right">
            <i class="icon-plus bx bx-plus-circle"></i>
          </div>
          <div style="margin-top:-33px;background-color:#2780eb;height:10px;width:${d.width - 2}px;border-radius:1px"></div>
          <div style="padding:20px; padding-top:35px;text-align:center">
            <div style="color:#111672;font-size:16px;font-weight:bold"> ${d.data.name} </div>
            <div class="manager" style="color:#404040;font-size:13px;margin-top:4px"><span>Manager:</span> ${d.data.manager.fullName} </div>
          </div> 
          <div style="display:flex;justify-content:space-between;padding-left:5px;padding-right:4px; margin-bottom:5px">
            <div> Dependent units: <span class="dependent-units">${d.data._directSubordinates}</span></div>  
            <div> Oversees: <span class="dependent-units">${d.data.employeeNumber}</span> 👤</div>    
          </div>    
      </div>
          `)
        .render();
    }
  }, [props.data, d3Container.current]);

  return (
    <div>
      <div ref={d3Container} />
    </div>
  );
}

export default OrgTreeDepartment;
