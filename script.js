document.addEventListener('DOMContentLoaded', () => {

  const COST_PER_VEHICLE = 500000;

  const DP_RATE = 0.25;

  const EMI_PER_VEHICLE = 8565;

  const TOTAL_INTEREST_PER_VEHICLE = 102380;

  const FINANCED_PER_VEHICLE = 375000;

  const slider = document.getElementById('vehicleSlider');

  const countSpan = document.getElementById('vehicleCount');

  const totalDP = document.getElementById('totalDP');

  const totalFinanced = document.getElementById('totalFinanced');

  const totalEMI = document.getElementById('totalEMI');

  const totalInterest = document.getElementById('totalInterest');

  const dynamicDPIssue = document.getElementById('dynamicDPIssue');

  const dynamicInterestIssue = document.getElementById('dynamicInterestIssue');

  let costChart = null;

  let amortizationChart = null;

  function formatCurrency(num) {

    if (num >= 100000) return `₹${(num / 100000).toFixed(2)} Lakhs`;

    return `₹${num.toLocaleString('en-IN')}`;

  }

  function updateDashboard(vehicleCount) {

    const dp = (COST_PER_VEHICLE * DP_RATE) * vehicleCount;

    const financed = FINANCED_PER_VEHICLE * vehicleCount;

    const emi = EMI_PER_VEHICLE * vehicleCount;

    const interest = TOTAL_INTEREST_PER_VEHICLE * vehicleCount;

    countSpan.innerText = `${vehicleCount} Vehicle${vehicleCount > 1 ? 's' : ''}`;

    totalDP.innerText = formatCurrency(dp);

    totalFinanced.innerText = formatCurrency(financed);

    totalEMI.innerText = formatCurrency(emi);

    totalInterest.innerText = formatCurrency(interest);

    dynamicDPIssue.innerText = formatCurrency(dp);

    dynamicInterestIssue.innerText = formatCurrency(interest);

  }

  function initCostBreakdownChart() {

    const ctx = document.getElementById('costBreakdownChart').getContext('2d');

    if (costChart) costChart.destroy();

    costChart = new Chart(ctx, {

      type: 'doughnut',

      data: {

        labels: ['Principal Financed', 'Total Interest Paid'],

        datasets: [{

          data: [FINANCED_PER_VEHICLE, TOTAL_INTEREST_PER_VEHICLE],

          backgroundColor: ['#4f46e5', '#f59e0b'],

          hoverOffset: 4

        }]

      },

      options: {

        responsive: true,

        maintainAspectRatio: false,

        plugins: {

          title: { display: true, text: 'Cost of Borrowing (Per Vehicle)' },

          tooltip: {

            callbacks: {

              label: (context) => `${context.label}: ₹${context.parsed.toLocaleString('en-IN')}`

            }

          }

        }

      }

    });

  }

  function initAmortizationChart() {

    const ctx = document.getElementById('amortizationChart').getContext('2d');

    if (amortizationChart) amortizationChart.destroy();

    const labels = ['Apr 24','May 24','Jun 24','Jul 24','Aug 24','Sep 24','Oct 24','Nov 24','Dec 24','Jan 25','Feb 25','Mar 25'];

    const interestData = [4219,4170,4120,4070,4019,3969,3917,3865,3812,3758,3705,3651];

    const principalData = [4346,4395,4445,4495,4546,4596,4648,4700,4753,4807,4860,4914];

    amortizationChart = new Chart(ctx, {

      type: 'line',

      data: {

        labels,

        datasets: [

          { label: 'Interest Paid', data: interestData, borderColor: '#ef4444', borderWidth: 2, tension: 0.3 },

          { label: 'Principal Paid', data: principalData, borderColor: '#3b82f6', borderWidth: 2, tension: 0.3 }

        ]

      },

      options: {

        responsive: true,

        maintainAspectRatio: false,

        plugins: { legend: { position: 'top' } },

        scales: {

          y: { title: { display: true, text: '₹ (per month)' } },

          x: { title: { display: true, text: 'Month' } }

        }

      }

    });

  }

  // Tab Functionality

  document.querySelectorAll('.tab-button').forEach(button => {

    button.addEventListener('click', () => {

      document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));

      document.querySelectorAll('[role="tabpanel"]').forEach(panel => panel.classList.add('hidden'));

      button.classList.add('active');

      document.getElementById(button.dataset.tabTarget).classList.remove('hidden');

    });

  });

  // Initialize everything

  slider.addEventListener('input', (e) => updateDashboard(parseInt(e.target.value)));

  updateDashboard(10);

  initCostBreakdownChart();

  initAmortizationChart();

});
