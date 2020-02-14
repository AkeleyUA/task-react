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
    }

    this.containerRef = React.createRef();
    this.delColRef = React.createRef();
    this.delRowRef = React.createRef();

    for (let i = 0; i < this.props.initialHeight; i++) {
      this.state.rows.push(i);
    }
    for (let i = 0; i < this.props.initialWidth; i++) {
      this.state.cols.push(i);
    }
  }

  addCol = () => {
    let {cols} = this.state;
    cols.push(cols[cols.length - 1] + 1);
    this.setState(cols);

    if (cols.length === 2) {
      this.delColRef.current.style.display = 'block';
    }
  }

  addRow = () => {
    let {rows} = this.state;
    rows.push(rows[this.state.rows.length - 1] + 1);
    this.setState(rows);

    if (rows.length === 2) {
      this.delRowRef.current.style.display = 'block';
    }
  }

  delCol = () => {
    let {cols, currentCol} = this.state;
    this.setState(cols.splice(currentCol, 1));
  
    if (cols.length === 1) {
      this.delColRef.current.style.display = 'none';
    }
    
    if (currentCol === cols.length) {
      this.setState({ currentCol: currentCol - 1 });
    }
  }

  delRow = () => {
    let {rows, currentRow} = this.state;
    this.setState(rows.splice(currentRow, 1));

    if (rows.length === 1) {
      this.delRowRef.current.style.display = 'none';
    }
    
    if (currentRow === rows.length) {
      this.setState({ currentRow: currentRow - 1 });
    }
  }

  showBtns = () => {
    let {rows, cols} = this.state;
    if (cols.length > 1) {
      this.delColRef.current.style.display = 'block';
    }

    if (rows.length > 1) {
      this.delRowRef.current.style.display = 'block';
    }
  };

  hideBtns = () => {
    this.delRowRef.current.style.display = 'none';
    this.delColRef.current.style.display = 'none';
  }

  delButtonMover = (event) => {
    if (event.target.classList.contains('col')) {
      if (+event.target.dataset.colIndex !== this.state.currentCol) {
        this.setState({currentCol: +event.target.dataset.colIndex});
      }
      if (+event.target.parentNode.dataset.rowIndex !== this.state.currentRow) {
        this.setState({currentRow: +event.target.parentNode.dataset.rowIndex});
      }
    }
  }

  containerMover = (event) => {
    const container = this.containerRef.current;
    const mousePosition = {
      x: event.clientX,
      y: event.clientY
    }
    container.style.left = `${mousePosition.x + this.state.left}px`;
    container.style.top = `${mousePosition.y + this.state.top}px`;
  }
  
  containerAddListener = (event) => {
    const containerTableRect = event.currentTarget.getBoundingClientRect();
    const eventRect = event.target.getBoundingClientRect();

    this.setState({
      left: containerTableRect.left - eventRect.left - event.nativeEvent.offsetX,
      top: containerTableRect.top - eventRect.top - event.nativeEvent.offsetY
    })
    window.addEventListener('mousemove', this.containerMover);
  }

  containerRemoveListener = () => {
    window.removeEventListener('mousemove', this.containerMover);
  }

  render() {
    let {cellSize} = this.props;
    let {currentRow, currentCol, rows, cols} = this.state;
    return (
      <div 
        className='container-table'
        ref={this.containerRef}
        onMouseEnter={this.showBtns}
        onMouseLeave={this.hideBtns}
      >
        <div 
          className='boxes-container'
          onMouseMove={this.delButtonMover}
          onMouseDown={this.containerAddListener}
          onMouseUp={this.containerRemoveListener}
        >
          {rows.map((row, index) => (
            <div className='row' key={row} data-row-index={index}>{
              cols.map((col, index) => (
                <div className='col'
                  style={{
                    width: cellSize,
                    height: cellSize
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
              width: cellSize + 2,
              height: cellSize + 2,
              right: -(cellSize + 3)
            }}
          >
            +
          </button>
          <button className='add add-row'
            onClick={this.addRow}
            style={{
              width: cellSize + 2,
              height: cellSize + 2,
              bottom: -(cellSize + 3)
            }}
          >
            +
          </button>
        </div>
        <div className='delete-btns-container' style={{ top: -cellSize, left: -cellSize}}>
          <button 
            className='delete del-col'
            ref={this.delColRef}
            onClick={this.delCol}
            style={{
              transform: (currentCol === cols.length
                ? `translateX(${(currentCol - 1) * cellSize + 2}px)`
                : `translateX(${currentCol * (cellSize + 2) + 1}px)`),
              width: cellSize + 2,
              height: cellSize + 2,
              left: cellSize
            }}
          >
            -
          </button>
          <button className='delete del-row'
            onClick={this.delRow}
            ref={this.delRowRef}
            style={{
              transform: (currentRow === rows.length
                ? `translateY(${(currentRow - 1) * cellSize + 2}px)`
                : `translateY(${currentRow * (cellSize + 2) + 1}px)`),
              width: cellSize + 2,
              height: cellSize + 2,
              top: cellSize
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