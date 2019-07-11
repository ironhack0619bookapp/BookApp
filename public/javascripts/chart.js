var ctx = document.getElementById('myChart').getContext('2d');
var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
        labels: ['Avengers: WebMad 0619 Edition','Game Of Thrones', 'Les Miserables', 'Harry Potter',
          'Bootcamp','A Brief Story Of Time', 'Quore'],
        datasets: [{
            label: 'Most Posted Books',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [90, 10, 5, 50, 20, 30, 45]
        }]
    },

    // Configuration options go here
    options: {
      
    }
})