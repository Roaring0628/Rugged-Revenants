import React, { useEffect, useState } from "react";

export default function CountDown({ dueDate }) {
  const calculateTimeLeft = () => {
    const difference = +new Date(dueDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60))),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval, index) => {
    timerComponents.push(
      <span key={index}>
        {(index > 0 && timeLeft[interval] < 10 ? '0' : '') + timeLeft[interval]}{index === 2 ? "" : ":"}
      </span>
    );
  });

  return (
    <div className="flex">
      {timerComponents.length ? timerComponents : <span>Done!</span>}
    </div>
  );
}
