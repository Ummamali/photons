import React from "react";

export default function RadioButtons({
  name,
  idToCategory,
  onChange,
  currentCategory,
  idToLabels,
  className,
}) {
  /*
        This single CONTROLLED component will render radio buttons which can be checked EXCLUSIVELY
        props:
        --idToCategory: map id for the label to category, category tells which radio button is checked or not
        --idToLabels: maps id to labels
        --onChange: what happens when the value changes
        --currentCategory: which category (radio-btton) is currently checked
        --className: as always, this will be applied to the returned div element
        --name: the name that will be common to all radio so that only one can be selected


        To change stylings, you have :
            --'.radio-contain' which is the overall container/parent of the radio-button
            --'input[type='radio']' are the main radio buttons
            --'.ghost-radio' div element to add any style you want
            --'label' which is the label for radio button
    */
  const buttons = [];
  const clsNme = className === undefined ? "" : className;
  for (const [id, categoryName] of Object.entries(idToCategory)) {
    buttons.push(
      <div className="radio-contain" key={id}>
        <input
          type="radio"
          name={name}
          id={id}
          data-category={categoryName}
          onChange={onChange}
          checked={currentCategory === categoryName}
        />
        <div className="ghost-radio"></div>
        <label htmlFor={id}>{idToLabels[id]}</label>
      </div>
    );
  }
  return <div className={clsNme}>{buttons}</div>;
}
