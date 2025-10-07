let cells = 0;
let cps = 0;
let stage = 1;

const cellCount = document.getElementById('cellCount');
const cpsDisplay = document.getElementById('cps');
const stageDisplay = document.getElementById('stage');
const clickButton = document.getElementById('clickButton');

const upgradeButtons = [
  { button: document.getElementById('upgrade1'), cps: 1, cost: 10 },
  { button: document.getElementById('upgrade2'), cps: 5, cost: 50 },
  { button: document.getElementById('upgrade3'), cps: 10, cost: 200 },
  { button: document.getElementById('upgrade4'), cps: 25, cost: 500 },
  { button: document.getElementById('upgrade5'), cps: 50, cost: 1000 }
];

const cellVisual = document.getElementById('cellVisual');

// Load saved game
if (localStorage.getItem('microverse')) {
  const save = JSON.parse(localStorage.getItem('microverse'));
  cells = save.cells;
  cps = save.cps;
  stage = save.stage;
  upgradeButtons.forEach((u, i) => u.cost = save.upgrades[i]);
}

// Click to generate cells
clickButton.addEventListener('click', () => {
  cells += 1;
  updateDisplay();
});

// Upgrade logic
upgradeButtons.forEach(upgrade => {
  upgrade.button.addEventListener('click', () => {
    if (cells >= upgrade.cost) {
      cells -= upgrade.cost;
      cps += upgrade.cps;
      upgrade.cost = Math.floor(upgrade.cost * 1.5);
      upgrade.button.textContent = `${upgrade.button.textContent.split(' - ')[0]} - Cost: ${upgrade.cost} Cells`;
      updateDisplay();
    }
  });
});

// Passive generation
setInterval(() => {
  cells += cps;
  updateDisplay();
  evolveStage();
  saveGame();
}, 1000);

// Display updates
function updateDisplay() {
  cellCount.textContent = cells;
  cpsDisplay.textContent = cps;
  stageDisplay.textContent = stage;
}

// Automatic evolution
function evolveStage() {
  if (cells >= stage * 1000) { // Example: evolve every 1000 cells per stage
    stage += 1;
    cellVisual.style.backgroundColor = getRandomColor();
    cellVisual.style.width = 20 + stage * 2 + 'px';
    cellVisual.style.height = 20 + stage * 2 + 'px';
  }
}

// Save game
function saveGame() {
  const save = {
    cells: cells,
    cps: cps,
    stage: stage,
    upgrades: upgradeButtons.map(u => u.cost)
  };
  localStorage.setItem('microverse', JSON.stringify(save));
}

// Random color for visual evolution
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
