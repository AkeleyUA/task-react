(this.webpackJsonphomework3=this.webpackJsonphomework3||[]).push([[0],[,,,,,,,,,function(t,e,s){t.exports=s(17)},,,,,function(t,e,s){},function(t,e,s){},function(t,e,s){},function(t,e,s){"use strict";s.r(e);var o=s(0),a=s.n(o),l=s(3),i=s.n(l),n=(s(14),s(4)),r=s(5),c=s(7),h=s(6),d=s(1),p=s(8),u=(s(15),function(t){function e(t){var s;return Object(n.a)(this,e),(s=Object(c.a)(this,Object(h.a)(e).call(this,t))).state={currentCol:0,currentRow:0,cols:[],rows:[],delColTransform:"none",delRowTransform:"none",delColDisplay:"none",delRowDisplay:"none"},s.createCol=function(t){var e=[];return t.forEach((function(t,o){return e.push(a.a.createElement("div",{className:"col",style:{width:s.props.cellSize+"px",height:s.props.cellSize+"px"},key:t,"data-col-index":o}))})),e},s.createRow=function(t){var e=[];return t.forEach((function(t,o){return e.push(a.a.createElement("div",{className:"row",key:t,"data-row-index":o},s.createCol(s.state.cols)))})),e},s.addCol=s.addCol.bind(Object(d.a)(s)),s.addRow=s.addRow.bind(Object(d.a)(s)),s.delCol=s.delCol.bind(Object(d.a)(s)),s.delRow=s.delRow.bind(Object(d.a)(s)),s.delButtonMover=s.delButtonMover.bind(Object(d.a)(s)),s.showBtns=s.showBtns.bind(Object(d.a)(s)),s.hideBtns=s.hideBtns.bind(Object(d.a)(s)),s}return Object(p.a)(e,t),Object(r.a)(e,[{key:"componentDidMount",value:function(){for(var t=[],e=[],s=0;s<this.props.initialHeight;s++)t.push(s);for(var o=0;o<this.props.initialWidth;o++)e.push(o);this.setState({rows:t}),this.setState({cols:e})}},{key:"addCol",value:function(){var t=this.state.cols;t.push(this.state.cols[this.state.cols.length-1]+1),this.setState({cols:t}),2===this.state.cols.length&&this.setState({delColDisplay:"block"})}},{key:"addRow",value:function(){var t=this.state.rows;t.push(this.state.rows[this.state.rows.length-1]+1),this.setState({rows:t}),2===this.state.rows.length&&this.setState({delRowDisplay:"block"})}},{key:"delCol",value:function(){var t=this.state.cols;this.state.cols.length>1&&(t.splice(this.state.currentCol,1),this.setState({cols:t}),1===this.state.cols.length&&this.setState({delColDisplay:"none"})),this.state.currentCol===this.state.cols.length&&(this.setState({currentCol:this.state.currentCol-1}),this.setState({delColTransform:"translateX(".concat((this.state.currentCol-1)*this.props.cellSize+2,"px)")}))}},{key:"delRow",value:function(){var t=this.state.rows;this.state.rows.length>1&&(t.splice(this.state.currentRow,1),this.setState({rows:t}),1===this.state.rows.length&&this.setState({delRowDisplay:"none"})),this.state.currentRow===this.state.rows.length&&(this.setState({currentRow:this.state.currentRow-1}),this.setState({delRowTransform:"translateY(".concat((this.state.currentRow-1)*this.props.cellSize+2,"px")}))}},{key:"createButtns",value:function(){return a.a.createElement(a.a.Fragment,null,a.a.createElement("div",{className:"add-btns-container"},a.a.createElement("button",{className:"add add-col",onClick:this.addCol,style:{width:this.props.cellSize+2+"px",height:this.props.cellSize+2+"px",right:-(this.props.cellSize+3)+"px"}},"+"),a.a.createElement("button",{className:"add add-row",onClick:this.addRow,style:{width:this.props.cellSize+2+"px",height:this.props.cellSize+2+"px",bottom:-(this.props.cellSize+3)+"px"}},"+")),a.a.createElement("div",{className:"delete-btns-container",style:{top:-this.props.cellSize+"px",left:-this.props.cellSize+"px"}},a.a.createElement("button",{className:"delete del-col",onClick:this.delCol,style:{display:this.state.delColDisplay,transform:this.state.delColTransform,width:this.props.cellSize+2+"px",height:this.props.cellSize+2+"px",left:this.props.cellSize+"px"}},"-"),a.a.createElement("button",{className:"delete del-row",onClick:this.delRow,style:{display:this.state.delRowDisplay,transform:this.state.delRowTransform,width:this.props.cellSize+2+"px",height:this.props.cellSize+2+"px",top:this.props.cellSize+"px"}},"-")))}},{key:"delButtonMover",value:function(t){t.target.classList.contains("col")&&(this.setState({currentCol:+t.target.dataset.colIndex}),this.setState({currentRow:+t.target.parentNode.dataset.rowIndex})),this.setState({delColTransform:"translateX(".concat(this.state.currentCol*(this.props.cellSize+2)+1,"px)")}),this.setState({delRowTransform:"translateY(".concat(this.state.currentRow*(this.props.cellSize+2)+1,"px)")})}},{key:"showBtns",value:function(){this.state.cols.length>1&&this.setState({delColDisplay:"block"}),this.state.rows.length>1&&this.setState({delRowDisplay:"block"})}},{key:"hideBtns",value:function(){this.setState({delColDisplay:"none"}),this.setState({delRowDisplay:"none"})}},{key:"render",value:function(){return a.a.createElement("div",{className:"container-table",onMouseMove:this.delButtonMover,onMouseEnter:this.showBtns,onMouseLeave:this.hideBtns},a.a.createElement("div",{className:"boxes-container"},this.createRow(this.state.rows)),this.createButtns())}}]),e}(a.a.Component));u.defaultProps={initialWidth:4,initialHeight:4,cellSize:50};s(16);var w=function(){return a.a.createElement(u,{initialWidth:4,initialHeight:4,cellSize:50})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(a.a.createElement(w,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()}))}],[[9,1,2]]]);
//# sourceMappingURL=main.48f8afb5.chunk.js.map