import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import './dashboard.scss';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import { IconButton } from '@material-ui/core';
import { Tooltip } from '@material-ui/core';
import * as ReactBootstrap from 'react-bootstrap';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
        dropdownData : [
            {
                text: 'Edit',
            },
            {
                text: 'Delete',
            },
            {
                text: 'Mark as Read',
            },
            {
                text: 'Like Message',
            }
        ],
      columnDefs: [
        { headerName: "Things To Do", field: "thingsToDo",resizable: true,width:500,headerClass:'header-left',rowDrag: true,},
        { headerName: "Owner", field: "owner",resizable: true,width:200,},
        { headerName: "Status", field: "status",resizable: true,width:300 ,
        cellStyle: function(params) {
            if (params.value=='Working on it') {
                //mark police cells as red
                return {color: 'white', backgroundColor: 'orange'};
            }
            else if (params.value=='Done') {
                //mark police cells as red
                return {color: 'white', backgroundColor: 'green'};
            } 
            else if (params.value=='Waiting for review') {
                //mark police cells as red
                return {color: 'white', backgroundColor: 'orange'};
            } 
            else if (params.value=='Stuck') {
                //mark police cells as red
                return {color: 'white', backgroundColor: '#CD025C'};
            } 
            else {
                return null;
            }
        }},
        { headerName: "Due Date", field: "dueDate",resizable: true,width:200 },
        { headerName: "Priority", field: "priority",resizable: true,width:300,
        cellStyle: function(params) {
            if (params.value=='Urgent') {
                //mark police cells as red
                return {color: 'white', backgroundColor: 'black'};
            }
            else if (params.value=='High') {
                //mark police cells as red
                return {color: 'white', backgroundColor: '#CD025C'};
            } 
            else if (params.value=='Medium') {
                //mark police cells as red
                return {color: 'white', backgroundColor: 'purple'};
            } 
            else if (params.value=='Low') {
                //mark police cells as red
                return {color: 'white', backgroundColor: 'blue'};
            } 
            else {
                return {color: 'white', backgroundColor: 'grey'};
            }
        }
        }],

      rowData: [
        { thingsToDo: "Item 1", owner: "", status: 'Working on it', dueDate:" Apr 1",priority:"Urgent"},
        { thingsToDo: "Item 2", owner: "", status: 'Stuck', dueDate:"Apr 10",priority:"High"},
        { thingsToDo: "Item 3", owner: "", status: 'Waiting for review', dueDate:"Apr 11",priority:"Medium"},
        { thingsToDo: "Item 4", owner: "", status: 'Done', dueDate:"Apr12",priority:"Low"},
        { thingsToDo: "Item 5", owner: "", status: 'Stuck', dueDate:"Apr 13",priority:""},
        { thingsToDo: "Item 6", owner: "", status: 'Done', dueDate:"Apr 14",priority:""},
    ]
    }
  }
  handelAddRow=()=>{
   var newItems = this.state.rowData;
   console.log("old row",newItems)
   newItems.push({thingsToDo: "New Item ", owner: "", status: 'Working on it', dueDate:"",priority:""})
   this.setState({rowData:newItems})
   this.gridApi.setRowData(newItems);
  }
  handelAddColumn=()=>
  {
       var newItems = this.state.columnDefs;
       newItems.push({ field:'SOME RANDOM', headerName: 'SOME RANDOM'});
       this.setState({columnDefs:newItems})
       this.gridApi.setColumnDefs(newItems)
  }
  onGridReady = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };
  render() {
      console.log("row",this.state.columnDefs)
    return (
         <div className="ag-theme-alpine" style={ {height: '400px', width: '100%'} }>
           <Tooltip title="Add Column">
            <IconButton color="primary" aria-label="add column"  onClick={()=>this.handelAddColumn()}>
              Add Column<AddCircleOutlineIcon />
           </IconButton>
           </Tooltip>
        <AgGridReact
            columnDefs={this.state.columnDefs}
            rowData={this.state.rowData}
            rowDragManaged={true}
            onGridReady={this.onGridReady}

            >
        </AgGridReact>
        <Tooltip title="Add Row">
            <IconButton color="primary" aria-label="add row" onClick={()=>this.handelAddRow()}  >
              Add Row<AddCircleOutlineIcon />
           </IconButton>
           </Tooltip>
           
      </div>
      
    );
  }
}

render(<Dashboard  />, document.getElementById('root'));