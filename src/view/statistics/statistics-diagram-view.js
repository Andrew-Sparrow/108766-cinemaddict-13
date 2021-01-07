import Smart from "../smart";
import dayjs from "dayjs";

import {
  countFilmsByGenres, getWatchedFilms,
} from "../../utils/statistics-utils";

import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

const renderFilmsChart = (filmsCtx, watchedFilms) => {

  const BAR_HEIGHT = 50;

  const propertiesWatchedFilmGenres = countFilmsByGenres(watchedFilms);

  const watchedGenres = Object.keys(propertiesWatchedFilmGenres);

  const countedWatchedGenres = Object.values(propertiesWatchedFilmGenres);

  filmsCtx.height = BAR_HEIGHT * 5;

  // Функция для отрисовки графика по цветам
  return new Chart(filmsCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: watchedGenres,
      datasets: [{
        data: countedWatchedGenres,
        backgroundColor: `#ffe800`,
        hoverBackgroundColor: `#ffe800`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20
          },
          color: `#ffffff`,
          anchor: `start`,
          align: `start`,
          offset: 40,
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#ffffff`,
            padding: 100,
            fontSize: 20
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 24
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    }
  });
};

const createStatisticsDiagramTemplate = () => {

  return `<div class="statistic__chart-wrap">
            <canvas class="statistic__chart" width="1000"></canvas>
          </div>`;
};

export default class StatisticsDiagramView extends Smart {
  constructor(films) {
    super();
    const watchedFilms = getWatchedFilms(films);

    this._data = {
      watchedFilms,
      dateFrom: dayjs().toDate(),
      dateTo: (() => {
        const daysToFullWeek = 15;
        return dayjs().add(daysToFullWeek, `day`).toDate();
      })()
    };

    this._filmsChart = null;

    this._setCharts();
  }

  getTemplate() {
    return createStatisticsDiagramTemplate();
  }

  restoreHandlers() {
    this._setCharts();
  }

  removeElement() {
    super.removeElement();

    if (this._filmsChart !== null) {
      this._filmsChart = null;
    }
  }

  _setCharts() {
    if (this._filmsChart !== null) {
      this._filmsChart = null;
    }

    const {
      watchedFilms,
      dateFrom,
      dateTo
    } = this._data;

    const filmsCtx = this.getElement(`.statistic__chart`);
    this._filmsChart = renderFilmsChart(filmsCtx, watchedFilms, dateFrom, dateTo);
  }
}
