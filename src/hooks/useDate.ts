export default function () {
  function format(timestamp: number) {
    let [date, time] = new Date(timestamp).toLocaleString("en-US").split(", ");
    return {
      date,
      time,
    };
  }
  return {
    format,
  };
}
