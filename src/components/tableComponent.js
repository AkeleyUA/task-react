import React from 'react';
import './tableComponent.css';

class TableComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCol: 0,
      currentRow: 0,
      cols: [],
      rows: [],
      delColTransform: 'none',
      delRowTransform: 'none'
    }
    for (let i = 0; i < this.props.initialHeight; i++) {
      this.state.rows.push(i);
    }
    for (let i = 0; i < this.props.initialWidth; i++) {
      this.state.cols.push(i);
    }
  }

  addCol = () => {
    let cloneCols = this.state.cols.slice();

    cloneCols.push(cloneCols[cloneCols.length - 1] + 1);
    this.setState({ cols: cloneCols });

    if (cloneCols.length === 2) {
      this.setState({ delColDisplay: 'block' });
    }
  }

  addRow = () => {
    let cloneRows = this.state.rows.slice();

    cloneRows.push(cloneRows[cloneRows.length - 1] + 1);
    this.setState({ rows: cloneRows });

    if (cloneRows.length === 2) {
      this.setState({ delRowDisplay: 'block' });
    }
  }

  delCol = () => {
    let cloneCols = this.state.cols.slice();

    if (cloneCols.length > 1) {
      cloneCols.splice(this.state.currentCol, 1);
      this.setState({ cols: cloneCols });

      if (cloneCols.length === 1) {
        this.setState({ delColDisplay: 'none' });
      }
    }

    if (this.state.currentCol === cloneCols.length) {
      this.setState({
        currentCol: this.state.currentCol - 1,
        delColTransform: `translateX(${(this.state.currentCol - 1) * this.props.cellSize + 2}px)` 
      })
    }
  }

  delRow = () => {
    let cloneRows = this.state.rows.slice();

    if (cloneRows.length > 1) {
      cloneRows.splice(this.state.currentRow, 1);
      this.setState({ rows: cloneRows });
    }
    if (cloneRows.length === 1) {
      this.setState({ delRowDisplay: 'none' });
    }
    
    if (this.state.currentRow === cloneRows.length) {
      this.setState({
        currentRow: this.state.currentRow - 1,
        delRowTransform: `translateY(${(this.state.currentRow - 1) * this.props.cellSize + 2}px`
      })
    }
  }

  getRef = (node) => { this.element = node }

  showBtns = () => {
    if (this.state.cols.length > 1) {
      this.setState({ delColDisplay: 'block' });
    }

    if (this.state.rows.length > 1) {
      this.setState({ delRowDisplay: 'block' });
    }
  };

  hideBtns = () => {
    this.setState({
      delColDisplay: 'none',
      delRowDisplay: 'none'
    })
  }

  delButtonMover = (event) => {
    if (event.target.classList.contains('col')) {
      this.setState({ 
        currentCol: +event.target.dataset.colIndex,
        currentRow: +event.target.parentNode.dataset.rowIndex
      })
    }
    this.setState({
      delColTransform: `translateX(${this.state.currentCol * (this.props.cellSize + 2) + 1}px)`,
      delRowTransform: `translateY(${this.state.currentRow * (this.props.cellSize + 2) + 1}px)`
    })
  }

  containerMover = (event) => {
    const mousePosition = {
      x: event.clientX, // screenX 
      y: event.clientY, // screenY
    }

    this.setState({
      leftMove: `${mousePosition.x + this.state.left}px`,
      topMove: `${mousePosition.y + this.state.top}px`
    })
  }
  
  containerAddListener = (event) => {
    const containerTableRect = event.currentTarget.getBoundingClientRect();
    const eventReact = event.target.getBoundingClientRect();

    this.setState({
      left: containerTableRect.left - eventReact.left - event.nativeEvent.offsetX,
      top: containerTableRect.top - eventReact.top - event.nativeEvent.offsetY
    })
    // window.addEventListener('mousemove', this.containerMover);
    this.element.addEventListener('mousemove', this.containerMover);
  }

  containerRemoveListener = () => {
    // window.removeEventListener('mousemove', this.containerMover);
    this.element.removeEventListener('mousemove', this.containerMover);
  }

  render() {
    return (
      <div 
        className='container-table'
        ref={this.getRef}
        onMouseMove={this.delButtonMover}
        onMouseEnter={this.showBtns}
        onMouseLeave={this.hideBtns}
        style = {{top: this.state.topMove, left: this.state.leftMove}}
      >
        <div 
          className='boxes-container'
          onMouseDown={this.containerAddListener}
          onMouseUp={this.containerRemoveListener}
        >
          {this.state.rows.map((row, index) => (
            <div className='row' key={row} data-row-index={index}>{
              this.state.cols.map((col, index) => (
                <div className='col'
                  style={{
                    width: this.props.cellSize + `px`,
                    height: this.props.cellSize + 'px'
                  }}
                  key={col}
                  data-col-index={index}
                />
              ))}</div>
          ))}
        </div>

        <div className='add-btns-container'>
          <button className='add add-col'
            onClick={this.addCol}
            style={{
              width: this.props.cellSize + 2 + 'px',
              height: this.props.cellSize + 2 + 'px',
              right: -(this.props.cellSize + 3) + 'px'
            }}
          >
            +
          </button>
          <button className='add add-row'
            onClick={this.addRow}
            style={{
              width: this.props.cellSize + 2 + 'px',
              height: this.props.cellSize + 2 + 'px',
              bottom: -(this.props.cellSize + 3) + 'px'
            }}
          >
            +
          </button>
        </div>
        <div className='delete-btns-container' style={{ top: -this.props.cellSize + 'px', left: -this.props.cellSize + 'px' }}>
          <button className='delete del-col'
            onClick={this.delCol}
            style={{
              display: this.state.delColDisplay,
              transform: this.state.delColTransform,
              width: this.props.cellSize + 2 + 'px',
              height: this.props.cellSize + 2 + 'px',
              left: this.props.cellSize + 'px'
            }}
          >
            -
          </button>
          <button className='delete del-row'
            onClick={this.delRow}
            style={{
              display: this.state.delRowDisplay,
              transform: this.state.delRowTransform,
              width: this.props.cellSize + 2 + 'px',
              height: this.props.cellSize + 2 + 'px',
              top: this.props.cellSize + 'px'
            }}
          >
            -
          </button>
        </div>
      </div>
    )
  }
}

TableComponent.defaultProps = { initialWidth: 4, initialHeight: 4, cellSize: 50 };

export default TableComponent;