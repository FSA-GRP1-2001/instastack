import React from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../../constants';

// zone that accepts drag and drop components
const DropArea = props => {
  const { setEl, id } = props;
  const handleDroppedItem = item => {
    console.log(id, 'DROPPING ITEM with contents of ', item);
    setEl(item.component, id);
  };

  const [{ isOver, canDrop, item }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: () => {
      console.log('dropping an item!', item);
      handleDroppedItem(item.content);
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
      item: monitor.getItem(),
    }),
  });

  const isActive = isOver && canDrop;
  let backgroundColor = 'white';
  if (isActive) {
    backgroundColor = 'yellow';
  } else if (canDrop) {
    backgroundColor = 'blue';
  }

  return (
    <div ref={drop} className="drop-area" style={{ backgroundColor }}>
      {props.children}
    </div>
  );
};

export default DropArea;
