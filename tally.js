// Query the DOM to isolate our tracktime data
const playlist = document.getElementById('playlist');
const trackList = Array.from(playlist.querySelectorAll('li'));

/**
 * Reducer for evaluating the total tracklist time of our playlist in seconds,
 * assuming that each track is longer than minute and less than one hour.
 * @param {number} acc The accumulator for the total tracklist time.
 * @param {number} cur The current tracklist time.
 */
function tracklistReducer(acc, cur) {
  const durationArr = cur.querySelector('.duration').textContent.split(':');
  console.log(durationArr);
  const trackSecondDuration = parseInt(durationArr[0] * 60) + parseInt(durationArr[1]);
  console.log(trackSecondDuration);
  return acc += trackSecondDuration;
}

/**
 * Formats a numerical value of time in seconds into the HH:MM:SS format, assuming
 * the total time does not exceed a day in duration.
 * @param {number} timeSeconds The time in seconds to format.
 */
function formatSecondTime(timeSeconds) {
  const hours = Math.trunc(timeSeconds / 3600);
  const hourString = hours < 10 ? `0${hours}` : hours;
  const minutes = Math.trunc(timeSeconds / 60);
  const minuteString = minutes < 10 ? `0${minutes}` : minutes;
  const seconds = timeSeconds % 60;
  const secondString = seconds < 10 ? `0${seconds}` : seconds;
  return `${hours > 0 ? hourString + ':' : ''}${minuteString}:${secondString}`;
}

// Store our total runtime in seconds for formatting
const tracklistSecondTime = trackList.reduce(tracklistReducer, 0);

// Output total track time to the DOM
const runtimeIndicator = document.getElementById('playlistRuntime');
const runtimeTextNode = document.createTextNode(`Total runtime: ${formatSecondTime(tracklistSecondTime)}`);
runtimeIndicator.appendChild(runtimeTextNode);
