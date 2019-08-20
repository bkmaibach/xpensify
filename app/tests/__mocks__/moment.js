// import moment from "moment";
// Seems to work without this line, but at least  in previous versions
// the regular import statement imports the mocked version, not the actual moment lib?
const moment = require.requireActual('moment');

export default (timestamp = 0) => {
  return moment(timestamp);
}