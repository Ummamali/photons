// This js file just host data for two radio buttons used in the collections screen

// the mode Radio button configs

export const modeRadioData = {
  idToCategory: {
    "mode-radio-view": "VIEW",
    "mode-radio-edit": "EDIT",
  },
  idToLabels: {
    "mode-radio-view": (
      <>
        <i className="fas fa-eye mr-0.5"></i>View
      </>
    ),
    "mode-radio-edit": (
      <>
        <i className="fas fa-edit mr-0.5"></i>Edit
      </>
    ),
  },
};

// the collectStatus radio button configs

export const collectRadioData = {
  idToCategory: {
    "cradio-success": "SUCCESS",
    "cradio-pending": "PENDING",
  },
  idToLabels: {
    "cradio-success": "Successful",
    "cradio-pending": "Pending",
  },
};
