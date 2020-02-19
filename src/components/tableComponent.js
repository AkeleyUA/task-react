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
      containerLeftGap: 0,
      containerTopGap: 0,
      showDelBtns: false,
    };

    this.containerRef = React.createRef();
    const { initialHeight, initialWidth } = this.props;
    const { rows, cols } = this.state;

    for (let i = 0; i < initialHeight; i++) {
      rows.push(i);
    }
    for (let i = 0; i < initialWidth; i++) {
      cols.push(i);
    }
  }

  addCol = () => {
    const { cols } = this.state;

    this.setState({
      cols: [
        ...cols,
        cols[cols.length - 1] + 1,
      ],
    });

    // if (cols.length === 2) {
    //   this.delColRef.current.style.display = 'block';
    // }
  }

  addRow = () => {
    const { rows } = this.state;

    this.setState({
      rows: [
        ...rows,
        rows[rows.length - 1] + 1,
      ],
    });

    // if (rows.length === 2) {
    //   this.delRowRef.current.style.display = 'block';
    // }
  }

  delCol = () => {
    const { cols, currentCol } = this.state;

    if (cols.length > 1) {
      this.setState({
        cols: cols.filter((col, index) => {
          if (index !== currentCol) {
            return col;
          }
        }),
      });
    }

    // if (cols.length === 1) {
    //   this.delColRef.current.style.display = 'none'; // Попробовать перекинуть в render();
    // }
    if (currentCol === cols.length) {
      this.setState({ currentCol: currentCol - 1 });
    }
  }

  delRow = () => {
    const { rows, currentRow } = this.state;

    if (rows.length > 1) {
      this.setState({
        rows: rows.filter((row, index) => {
          if (index !== currentRow) {
            return row;
          }
        }),
      });
    }

    // if (rows.length === 1) {
    //   this.delRowRef.current.style.display = 'none';
    // }
    if (currentRow === rows.length) {
      this.setState({ currentRow: currentRow - 1 });
    }
  }

  showBtns = () => {
  // новый стейт и мышка над таблицей
    this.setState({ showDelBtns: true });
  };

  hideBtns = () => {
    this.setState({ showDelBtns: false });
  }

  delButtonMover = (event) => {
    const { currentCol, currentRow } = this.state;
    if (event.target.classList.contains('col')) {
      if (+event.target.dataset.colIndex !== currentCol) {
        this.setState({ currentCol: +event.target.dataset.colIndex });
      }
      if (+event.target.parentNode.dataset.rowIndex !== currentRow) {
        this.setState({ currentRow: +event.target.parentNode.dataset.rowIndex });
      }
    }
  }

  containerMover = (event) => {
    const { containerLeftGap, containerTopGap } = this.state;
    const container = this.containerRef.current;
    const mousePosition = {
      x: event.clientX,
      y: event.clientY,
    };
    container.style.left = `${mousePosition.x + containerLeftGap}px`;
    container.style.top = `${mousePosition.y + containerTopGap}px`;
  }

  containerAddListener = (event) => {
    const containerTableRect = event.currentTarget.getBoundingClientRect();
    const currentBoxRect = event.target.getBoundingClientRect(); // Event название +

    this.setState({ // Определить в начале, не добавлять на лету. +
      containerLeftGap: containerTableRect.left - currentBoxRect.left - event.nativeEvent.offsetX,
      containerTopGap: containerTableRect.top - currentBoxRect.top - event.nativeEvent.offsetY,
    });

    window.addEventListener('mousemove', this.containerMover);
  }

  containerRemoveListener = () => {
    window.removeEventListener('mousemove', this.containerMover);
  }

  render() {
    const { cellSize } = this.props;
    const {
      currentRow,
      currentCol,
      rows,
      cols,
      showDelBtns,
    } = this.state;

    return (
      <div
        className="container-table"
        ref={this.containerRef}
        onMouseEnter={this.showBtns}
        onMouseLeave={this.hideBtns}
      >
        <div
          className="boxes-container"
          onMouseOver={this.delButtonMover}
          onMouseDown={this.containerAddListener}
          onMouseUp={this.containerRemoveListener}
        >
          {
            rows.map((row, index) => (
              <div className="row" key={row} data-row-index={index}>
                {
                  cols.map((col, i) => (
                    <div
                      className="col"
                      style={{
                        width: cellSize,
                        height: cellSize,
                      }}
                      key={col}
                      data-col-index={i}
                    />
                  ))
                }
              </div>
            ))
          }
        </div>

        <div className="add-btns-container">
          <button
            type="button"
            className="add add-col"
            onClick={this.addCol}
            style={{
              width: cellSize + 2,
              height: cellSize + 2,
              right: -(cellSize + 3),
            }}
          >
            +
          </button>
          <button
            type="button"
            className="add add-row"
            onClick={this.addRow}
            style={{
              width: cellSize + 2,
              height: cellSize + 2,
              bottom: -(cellSize + 3),
            }}
          >
            +
          </button>
        </div>
        <div className="delete-btns-container" style={{ top: -cellSize, left: -cellSize }}>
          <button
            type="button"
            className="delete del-col"
            onClick={this.delCol}
            style={{
              display: (showDelBtns === true && cols.length > 1 ? 'block' : 'none'),
              transform: (currentCol === cols.length
                ? `translateX(${(currentCol - 1) * cellSize + 2}px)`
                : `translateX(${currentCol * (cellSize + 2) + 1}px)`),
              width: cellSize + 2,
              height: cellSize + 2,
              left: cellSize,
            }}
          >
            -
          </button>
          <button
            type="button"
            className="delete del-row"
            onClick={this.delRow}
            style={{
              display: (showDelBtns === true && rows.length > 1 ? 'block' : 'none'),
              transform: (currentRow === rows.length
                ? `translateY(${(currentRow - 1) * cellSize + 2}px)`
                : `translateY(${currentRow * (cellSize + 2) + 1}px)`),
              width: cellSize + 2,
              height: cellSize + 2,
              top: cellSize,
            }}
          >
            -
          </button>
        </div>
      </div>
    );
  }
}

TableComponent.defaultProps = { initialWidth: 4, initialHeight: 4, cellSize: 50 };

export default TableComponent;
