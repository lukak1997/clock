import { useState, useEffect } from "react";
import sun from "./assets/desktop/icon-sun.svg";
import moon from "./assets/desktop/icon-moon.svg";
import arrowDown from "./assets/desktop/icon-arrow-down.svg";
import arrowUp from "./assets/desktop/icon-arrow-up.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [more, setMore] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<any>(new Date());
  const [data, setData] = useState<any>("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    const response = async () => {
      try {
        const resp = await axios.get(`https://api.ipbase.com/v1/json/`);
        const fullData = await resp.data;
        setData(fullData);
      } catch (error) {
        alert("Error");
      }
    };
    response();

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  function findWeek(date: any) {
    let d: any;
    d = new Date(date);
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    let yearStart: any;
    yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
    return weekNo;
  }

  function getDayNumberInYear(date: any) {
    let d: any | object;
    d = new Date(date);
    let yearStart: any;
    yearStart = new Date(d.getFullYear(), 0, 1);
    const diffInMs = d.getTime() - yearStart.getTime();
    const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
    return diffInDays;
  }

  const weekNumber: any = findWeek(currentTime);
  const dayOfYear: any = getDayNumberInYear(currentTime);
  return (
    <div
      className={
        currentTime.toLocaleTimeString().includes("PM")
          ? "App day-time"
          : "App night-time"
      }
    >
      <div className="shadow">
        {more ? null : (
          <div className="row">
            <p className="header">
              The science of operations, as derived from mathematics more
              especially , is a science of itself, and has its own abstract
              truth and value.
            </p>
          </div>
        )}
        <div className="row flex">
          <div className="icon-paragraph">
            <img
              alt="img"
              src={currentTime.toLocaleTimeString().includes("PM") ? sun : moon}
            ></img>
            <p className="currently">
              {currentTime.toLocaleTimeString().includes("PM")
                ? "Good morning, it's currently"
                : "Good evening, it's currently"}
            </p>
          </div>

          <h1 className="time">{currentTime.toLocaleTimeString()}</h1>
          <div className="region-moreinfo">
            <p className="region">{`IN ${data?.region_name}, ${data?.country_name}`}</p>

            <button>
              {more ? "LESS" : "MORE"}
              <div className="circle">
                <img
                  onClick={() => setMore(!more)}
                  className="arrow-icon"
                  src={more ? arrowDown : arrowUp}
                  alt="img"
                ></img>
              </div>
            </button>
          </div>
        </div>
        {more ? (
          <div className="row grey">
            <div className="col">
              <div className="more-info">
                <h3>CURRENT TIMEZONE</h3>
                <h1>{data?.time_zone}</h1>
              </div>
              <div>
                <h3>DAY OF THE YEAR</h3>
                <h1>{dayOfYear}</h1>
              </div>
            </div>
            <div className="line"></div>
            <div className="col">
              <div className="more-info">
                <h3>DAY OF THE WEEK</h3>
                <h1>{currentTime.getDay()}</h1>
              </div>
              <div>
                <h3>WEEK NUMBER</h3>
                <h1>{weekNumber}</h1>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
