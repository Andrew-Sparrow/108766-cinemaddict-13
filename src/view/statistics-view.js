// import Smart from "./smart";
//
// import Chart from "chart.js";
// import ChartDataLabels from 'chartjs-plugin-datalabels';
//
// import {countWatchedFilmsInDateRange} from "../utils/statistics-utils";
//
// import dayjs from "dayjs";

// const renderColorsChart = (colorsCtx, films) => {
//
//   const BAR_HEIGHT = 50;
//   const statisticCtx = document.querySelector(`.statistic__chart`);
//
//   statisticCtx.height = BAR_HEIGHT * 5;
//
//   // Функция для отрисовки графика по цветам
//   return new Chart(statisticCtx, {
//     plugins: [ChartDataLabels],
//     type: `horizontalBar`,
//     data: {
//       labels: [`Sci-Fi`, `Animation`, `Fantasy`, `Comedy`, `TV Series`],
//       datasets: [{
//         data: [11, 8, 7, 4, 3],
//         backgroundColor: `#ffe800`,
//         hoverBackgroundColor: `#ffe800`,
//         anchor: `start`
//       }]
//     },
//     options: {
//       plugins: {
//         datalabels: {
//           font: {
//             size: 20
//           },
//           color: `#ffffff`,
//           anchor: `start`,
//           align: `start`,
//           offset: 40,
//         }
//       },
//       scales: {
//         yAxes: [{
//           ticks: {
//             fontColor: `#ffffff`,
//             padding: 100,
//             fontSize: 20
//           },
//           gridLines: {
//             display: false,
//             drawBorder: false
//           },
//           barThickness: 24
//         }],
//         xAxes: [{
//           ticks: {
//             display: false,
//             beginAtZero: true
//           },
//           gridLines: {
//             display: false,
//             drawBorder: false
//           },
//         }],
//       },
//       legend: {
//         display: false
//       },
//       tooltips: {
//         enabled: false
//       }
//     }
//   });
// };

// const createStatisticsTemplate = (data) => {
//   const {
//     films,
//     dateFrom,
//     dateTo
//   } = data;
//
//   const completedTaskCount = countWatchedFilmsInDateRange(films, dateFrom, dateTo);
//
//   return `<section class="statistic">
//     <p class="statistic__rank">
//       Your rank
//       <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
//       <span class="statistic__rank-label">Sci-Fighter</span>
//     </p>
//
//     <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
//       <p class="statistic__filters-description">Show stats:</p>
//
//       <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
//       <label for="statistic-all-time" class="statistic__filters-label">All time</label>
//
//       <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
//       <label for="statistic-today" class="statistic__filters-label">Today</label>
//
//       <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
//       <label for="statistic-week" class="statistic__filters-label">Week</label>
//
//       <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
//       <label for="statistic-month" class="statistic__filters-label">Month</label>
//
//       <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
//       <label for="statistic-year" class="statistic__filters-label">Year</label>
//     </form>
//
//     <ul class="statistic__text-list">
//       <li class="statistic__text-item">
//         <h4 class="statistic__item-title">You watched</h4>
//         <p class="statistic__item-text">22 <span class="statistic__item-description">movies</span></p>
//       </li>
//       <li class="statistic__text-item">
//         <h4 class="statistic__item-title">Total duration</h4>
//         <p class="statistic__item-text">130 <span class="statistic__item-description">h</span> 22 <span class="statistic__item-description">m</span></p>
//       </li>
//       <li class="statistic__text-item">
//         <h4 class="statistic__item-title">Top genre</h4>
//         <p class="statistic__item-text">Sci-Fi</p>
//       </li>
//     </ul>
//
//     <div class="statistic__chart-wrap">
//       <canvas class="statistic__chart" width="1000"></canvas>
//     </div>
//
//   </section>`;
// };

// export default class StatisticsView extends Smart {
//   constructor(films) {
//     super();
//
//     this._data = {
//       films,
//       dateFrom: (() => {
//         const daysToFullWeek = 6;
//         return dayjs().subtract(daysToFullWeek, `day`).toDate();
//       })(),
//       dateTo: dayjs().toDate()
//     };
//
//     this._colorsCart = null;
//     this._daysChart = null;
//
//     this._dateChangeHandler = this._dateChangeHandler.bind(this);
//
//     this._setCharts();
//   }
//
//   getTemplate() {
//     return createStatisticsTemplate();
//   }
//
//   restoreHandlers() {
//     this._setCharts();
//   }
//
//   removeElement() {
//     super.removeElement();
//
//     if (this._colorsCart !== null || this._daysChart !== null) {
//       this._colorsCart = null;
//       this._daysChart = null;
//     }
//   }
//
//   _dateChangeHandler([dateFrom, dateTo]) {
//     if (!dateFrom || !dateTo) {
//       return;
//     }
//
//     this.updateData({
//       dateFrom,
//       dateTo
//     });
//   }
//
//   _setCharts() {
//     if (this._colorsCart !== null || this._daysChart !== null) {
//       this._colorsCart = null;
//       this._daysChart = null;
//     }
//
//     const {tasks, dateFrom, dateTo} = this._data;
//     const colorsCtx = this.getElement().querySelector(`.statistic__colors`);
//     const daysCtx = this.getElement().querySelector(`.statistic__days`);
//
//     this._colorsCart = renderColorsChart(colorsCtx, tasks);
//     this._daysChart = renderDaysChart(daysCtx, tasks, dateFrom, dateTo);
//   }
// }