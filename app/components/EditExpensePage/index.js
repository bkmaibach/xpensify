import React from 'react';
const EditExpensePage = (props) => (
  <div>Editing expense with an ID of: {props.match.params.id}</div>
);

export default EditExpensePage;
