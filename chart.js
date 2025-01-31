var dummy_json_substrate_hy1 = `[
  { "day": "2/16", "LAI": "16.05", "url": "./garden/2024_02_16.ply"},
  { "day": "2/17", "LAI": "18.70", "url": "./garden/2024_02_17.ply"},
  { "day": "2/18", "LAI": "20.92", "url": "./garden/2024_02_18.ply"},
  { "day": "2/19", "LAI": "21.60", "url": "./garden/2024_02_19.ply"},
  { "day": "2/20", "LAI": "22.74", "url": "./garden/2024_02_20.ply"},
  { "day": "2/24", "LAI": "23.50", "url": "./garden/2024_02_24.ply"},
  { "day": "3/4", "LAI": "24.89", "url": "./garden/2024_03_04.ply"},
  { "day": "3/5", "LAI": "25.79", "url": "./garden/2024_03_05.ply"},
  { "day": "3/6", "LAI": "26.28", "url": "./garden/2024_03_06.ply"},
  { "day": "3/7", "LAI": "26.90", "url": "./garden/2024_03_07.ply"},
  { "day": "3/8", "LAI": "27.50", "url": "./garden/2024_03_08.ply"},
  { "day": "3/9", "LAI": "27.76", "url": "./garden/2024_03_09.ply"},
  { "day": "3/10", "LAI": "28.40", "url": "./garden/2024_03_10.ply"},
  { "day": "3/11", "LAI": "29.10", "url": "./garden/2024_03_11.ply"}
  ]`;

const fileLists = JSON.parse(dummy_json_substrate_hy1);

var days = []
for (let i = 0; i < fileLists.length; i++){
  days.push(fileLists[i].day)
}

var LAIs = []
for (let i = 0; i < fileLists.length; i++){
  LAIs.push(fileLists[i].LAI)
}

const ctx = document.getElementById('myChart');

new Chart(ctx, {
  type: 'line',
  data: {
  labels: days,
  datasets: [{
    label: 'LA',
    data: LAIs,
    backgroundColor: 'rgb(50, 205, 100)',
    borderColor: 'rgb(50, 205, 100)',
    borderWidth: 1
  }]
  },
  options: {
    scales: {
      y: {
      beginAtZero: false//true
      }
    }
  }
});
