import React, { Component } from "react";
import { QUESTIONS } from "./questions";

class App extends Component {
  state = {
    index: 0,
    yesCount: 0,
    completed: false,
    avgScore: 0,
    runs: 0,
  };

  componentDidMount() {
    const runs = JSON.parse(localStorage.getItem("runs")) || [];
    this.setState({
      runs: runs.length,
      avgScore: runs.reduce((a, s) => a + s, 0) / (runs.length || 1),
    });
  }

  handleAnswer = (yes) => {
    const { index, yesCount } = this.state;
    const finalYesCount = yesCount + (yes ? 1 : 0);
    const nextIndex = index + 1;

    if (nextIndex < Object.keys(QUESTIONS).length) {
      this.setState({ index: nextIndex, yesCount: finalYesCount });
    } else {
      const score = (100 * finalYesCount) / Object.keys(QUESTIONS).length;
      const runs = JSON.parse(localStorage.getItem("runs")) || [];
      runs.push(score);
      localStorage.setItem("runs", JSON.stringify(runs));
      this.setState({
        completed: true,
        yesCount: finalYesCount,
        avgScore: runs.reduce((a, s) => a + s, 0) / runs.length,
        runs: runs.length,
      });
    }
  };

  render() {
    const { index, completed, yesCount, avgScore, runs } = this.state;
    return (
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="col-md-6">
          <div className="card shadow-lg">
            <div className="card-body">
              {!completed ? (
                <>
                  <h5 className="card-title mb-4">{QUESTIONS[index + 1]}</h5>
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-success d-flex align-items-center"
                      onClick={() => this.handleAnswer(true)}
                    >
                      <i className="bi bi-check-circle-fill me-2"></i>
                      Yes
                    </button>
                    <button
                      className="btn btn-danger d-flex align-items-center"
                      onClick={() => this.handleAnswer(false)}
                    >
                      <i className="bi bi-x-circle-fill me-2"></i>
                      No
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h5 className="card-title">Quiz Completed!</h5>
                  <p className="card-text">
                    Your score:{" "}
                    <strong>
                      {(100 * yesCount) / Object.keys(QUESTIONS).length}%
                    </strong>
                  </p>
                  <p className="card-text">
                    Average score over {runs} runs: <strong>{avgScore}%</strong>
                  </p>
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      this.setState({ index: 0, yesCount: 0, completed: false })
                    }
                  >
                    Retake Quiz
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
