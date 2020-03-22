import React from 'react';
import { ItemTypes } from '../../constants';
import { useDrag } from 'react-dnd';

const DragItem = props => {
  const { component } = props;
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.CARD, content: { ...props } },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} className="menu-item" opacity={isDragging ? 0.5 : 1}>
      <p>{component.openTag}</p>
      {component.title !== null ? <p>{component.title}</p> : null}
    </div>
  );
};

export default DragItem;
