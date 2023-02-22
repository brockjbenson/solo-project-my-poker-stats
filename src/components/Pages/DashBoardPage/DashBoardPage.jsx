import React from "react";
import LogOutButton from "../../Shared/LogOutButton/LogOutButton";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { number } from "prop-types";
import { useEffect } from "react";
import { format } from "date-fns";
import { useHistory } from "react-router-dom";
import Nav from "../../Shared/Nav/Nav";

function DashBoardPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const history = useHistory();
  const [sessionID, setSessionId] = useState("");
  const [venueID, setVenueID] = useState("");
  const wins = [];
  const [winPercentage, setWinPercentage] = useState(0);
  const dispatch = useDispatch();
  const allStats = useSelector((store) => store.allStatsReducer);
  const sessions = useSelector((store) => store.sessionsReducer);
  const sessionCard = useSelector(
    (store) => store.sessionsReducer.allSessionsReducer
  );
  console.log();
  const venueStats = useSelector(
    (store) => store.venuesReducer.getVenuesStatsReducer
  );
  console.log("venues:", venueStats);
  console.log(sessionCard[3]);

  useEffect(() => {
    dispatch({ type: "FETCH_ALL_STATS" });
    dispatch({ type: "FETCH_SESSIONS" });
    dispatch({ type: "FETCH_VENUES" });
    dispatch({ type: "FETCH_VENUES_STATS" });
  }, []);

  const sendToVenues = () => {
    history.push(`/venue-list`);
  };

  const sendToVenue = (venid) => {
    history.push(`/venue-view/${venid}`);
  };

  const sendToSession = (seshid, venid) => {
    history.push(`/session-view/${seshid}/${venid}`);
  };

  useEffect(() => {
    sessions.allSessionsReducer.map((session, index) => {
      if (session.net_profit >= 0) {
        wins.push(session);
      }
    });

    console.log(wins.length, sessions.allSessionsReducer.length);
    const workingWinPercent = Math.round(
      (wins.length / sessions.allSessionsReducer.length) * 100
    );
    setWinPercentage(isNaN(workingWinPercent) ? 0 : workingWinPercent);
  }, [sessions.allSessionsReducer]);

  // console.log("win %:", wins.length / sessions.allSessionsReducer.length);
  // console.log(wins);

  return (
    <div className="body-container">
      <div className="main-container">
        <div className="dashboard-container">
          <div className="heading">
            <h1>Dashboard</h1>
          </div>
          <div className="stats-container">
            <div className="stat">
              <p>Total Net Profit</p>
              {allStats[0] !== undefined ? (
                <h2>${allStats[0].total_net}</h2>
              ) : (
                <h2>N/A</h2>
              )}
            </div>
            <div className="stat">
              <p>Total Sessions</p>
              {allStats[0] !== undefined ? (
                <h2>{allStats[0].total_sessions}</h2>
              ) : (
                <h2>N/A</h2>
              )}
            </div>
            <div className="stat">
              <p>Total Hours</p>
              {allStats[0] !== undefined ? (
                <h2>{allStats[0].total_hours}</h2>
              ) : (
                <h2>N/A</h2>
              )}
            </div>
            <div className="stat">
              <p>Win Rate</p>
              {allStats[0] !== undefined ? (
                <h2>{winPercentage}%</h2>
              ) : (
                <h2>N/A</h2>
              )}
            </div>
            <div className="stat">
              <p>Session Avg</p>
              {allStats[0] !== undefined ? (
                <h2>${allStats[0].avg_session_net}</h2>
              ) : (
                <h2>N/A</h2>
              )}
            </div>
            <div className="stat">
              <p>Avg Hourly</p>
              {allStats[0] !== undefined ? (
                <h2>${allStats[0].hourly_total}</h2>
              ) : (
                <h2>N/A</h2>
              )}
            </div>
          </div>

          <div className="card-container">
            {allStats[0] !== undefined ? (
              <div className="recent-venue">
                <div className="recent">
                  <p>Recent</p>
                </div>
                <div className="recent">
                  <p onClick={sendToVenues}>See All</p>
                </div>
              </div>
            ) : (
              <div className="recent-venue"></div>
            )}
            {venueStats[0] !== undefined ? (
              <div
                key={venueStats[0].venue_id}
                onClick={() => sendToVenue(venueStats[0].venue_id)}
                className="venue-card"
              >
                <div className="venue-header">
                  <h2>{venueStats[0].venue_name}</h2>
                </div>
                <div className="venue-stats">
                  <div className="venue-stat">
                    {" "}
                    <p>Net Profit</p>
                    <h2>${venueStats[0].venue_net}</h2>
                  </div>
                  <div className="venue-stat">
                    <p>Hourly Net</p>
                    <h2>${venueStats[0].venue_hourly}</h2>
                  </div>
                  <div className="venue-stat">
                    <p>Total Hours</p>
                    <h2>{venueStats[0].total_hours}</h2>
                  </div>
                  <div className="venue-stat">
                    <p>Sessions</p>
                    <h2>{venueStats[0].sessions_played}</h2>
                  </div>
                </div>
              </div>
            ) : (
              <div className="venue-card">
                <div className="venue-header">
                  <h2>No Stats to show</h2>
                  <p>
                    Click the add venue the "Add Venue" button below to get
                    started with MyPokerStats!
                  </p>
                  <button onClick={sendToVenues}>Add Venue</button>
                </div>
              </div>
            )}
            {sessionCard[3] !== undefined && (
              <div
                onClick={() =>
                  sendToSession(sessionCard[3].id, sessionCard[3].venue_id)
                }
                className="session-card"
              >
                <div className="session-header">
                  <div className="session-date">
                    <h2>
                      {format(
                        new Date(sessionCard[3].session_date),
                        "dd/MM/yy"
                      )}
                    </h2>
                  </div>
                  <div className="venue-name">
                    <h2>{sessionCard[3].venue}</h2>
                  </div>
                </div>
                <div className="session-stats">
                  <div className="session-stat">
                    <p>Net Profit:</p>
                    <h2>{sessionCard[3].net_profit}</h2>
                  </div>
                  <div className="session-stat">
                    <p>Stakes:</p>
                    <h2>{sessionCard[3].stakes}</h2>
                  </div>
                  <div className="session-stat">
                    <p>Hourly Net:</p>
                    <h2>{sessionCard[3].hourly}</h2>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="nav-container">
        <Nav />
      </div>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default DashBoardPage;
