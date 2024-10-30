const materials = [
    { detail: "Pipe 6M", sapCode: "2000696688", factor: 0.12 },
    { detail: "Pipe 4M", sapCode: "2001611867", factor: 0.09 },
    { detail: "Pipe 3M", sapCode: "2001611869", factor: 0.11 },
    { detail: "Pipe 2M", sapCode: "2001611870", factor: 0.047 },
    { detail: "Plank", sapCode: "2001614839", factor: 0.14 },
    { detail: "4M Ladder", sapCode: "2001060418", factor: 0.003 },
    { detail: "6M Ladder", sapCode: "2000711579", factor: 0.0045 },
    { detail: "9M Ladder", sapCode: "2000847861", factor: 0.0024 },
    { detail: "Ladder clamp", sapCode: "2001614909", factor: 0.0414 },
    { detail: "Swivel clamp", sapCode: "2001041234", factor: 0.1944 },
    { detail: "Fixed clamp", sapCode: "2001041233", factor: 0.7703 },
    { detail: "Base plate", sapCode: "2001617727", factor: 0.12 },
    { detail: "Plank Clamp", sapCode: "2001614910", factor: 0.18 },
    { detail: "Toe Board 1/1.5", sapCode: "2001614834", factor: 0.01 },
    { detail: "Toe Board 1.5/2.7", sapCode: "2001614833", factor: 0.03 },
    { detail: "Jali", sapCode: "2001034447", factor: 0.01 },
    { detail: "Sole plate", sapCode: "2001512422", factor: 0.006 }
];

// Productivity rates
const ERECTION_PRODUCTIVITY = 4.5; // cubic meters/hour/scaffolder
const REMOVAL_PRODUCTIVITY = 6.5;  // cubic meters/hour/scaffolder
const SCAFFOLDERS_PER_GANG = 5;

function calculate() {
    const volume = parseFloat(document.getElementById("scaffoldingVolume").value);
    const hoursPerDay = parseInt(document.getElementById("workingHours").value);

    // Populate Material Table
    const materialTable = document.getElementById("materialTable");
    materialTable.innerHTML = "";
    materials.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.detail}</td>
            <td>${item.sapCode}</td>
            <td>${Math.ceil(volume * item.factor).toLocaleString()}</td>
        `;
        materialTable.appendChild(row);
    });
}

function calculateFromDays() {
    const volume = parseFloat(document.getElementById("scaffoldingVolume").value);
    const hoursPerDay = parseInt(document.getElementById("workingHours").value);
    const duration = parseFloat(document.getElementById("totalDays").value);

    // Calculate Total Erection and Removal Hours
    const erectionHours = volume / ERECTION_PRODUCTIVITY;
    const removalHours = volume / REMOVAL_PRODUCTIVITY;
    const totalHours = erectionHours + removalHours;

    // Calculate Man-Hours per Day per Gang
    const manHoursPerDayPerGang = hoursPerDay * SCAFFOLDERS_PER_GANG;

    // Calculate Required Gangs
    const requiredGangs = totalHours / (manHoursPerDayPerGang * duration);
    document.getElementById("totalGangs").value = Math.ceil(requiredGangs);

    // Calculate Total Mandays
    const totalMandays = duration * SCAFFOLDERS_PER_GANG * requiredGangs;
    document.getElementById("totalMandays").value = Math.ceil(totalMandays).toLocaleString();
}

function calculateFromGangs() {
    const volume = parseFloat(document.getElementById("scaffoldingVolume").value);
    const hoursPerDay = parseInt(document.getElementById("workingHours").value);
    const gangs = parseFloat(document.getElementById("totalGangs").value);

    // Calculate Total Erection and Removal Hours
    const erectionHours = volume / ERECTION_PRODUCTIVITY;
    const removalHours = volume / REMOVAL_PRODUCTIVITY;
    const totalHours = erectionHours + removalHours;

    // Calculate Man-Hours per Day
    const manHoursPerDay = hoursPerDay * SCAFFOLDERS_PER_GANG * gangs;

    // Calculate Required Duration
    const requiredDuration = totalHours / manHoursPerDay;
    document.getElementById("totalDays").value = Math.ceil(requiredDuration);

    // Calculate Total Mandays
    const totalMandays = requiredDuration * SCAFFOLDERS_PER_GANG * gangs;
    document.getElementById("totalMandays").value = Math.ceil(totalMandays).toLocaleString();
}
