const getExpensesUpToFirstSunday = (expenses) => {
  const result = [];

  for (const [month, days] of Object.entries(expenses)) {
    const sortedDays = Object.keys(days).sort(
      (a, b) => parseInt(a) - parseInt(b)
    );

    if (sortedDays.length === 0) break;

    let firstSundayFound = false;

    for (let i = 1; i <= 7; i++) {
      const dayString = i.toString().padStart(2, "0");
      const date = new Date(`${month}-${dayString}`);

      if (date.getDay() === 0) {
        firstSundayFound = true;
      }

      if (sortedDays.includes(dayString)) {
        const categories = days[dayString];
        for (const categoryExpenses of Object.values(categories)) {
          if (categoryExpenses.length === 0) break;
          result.push(...categoryExpenses);
        }
      }

      if (firstSundayFound) break;
    }
  }
  return result;
};

const median = (numbers) => {
  const sorted = numbers.slice().sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return (sorted[mid - 1] + sorted[mid]) / 2;
  } else {
    return sorted[mid];
  }
};

const solution = (expenses) => {
  const allExpenses = getExpensesUpToFirstSunday(expenses);
  return median(allExpenses);
};

const expenses = {
  "2023-01": {
    "01": {
      food: [22.11, 43, 11.72, 2.2, 36.29, 2.5, 19],
      fuel: [210.22],
    },
    "09": {
      food: [11.9],
      fuel: [190.22],
    },
  },
  "2023-03": {
    "07": {
      food: [20, 11.9, 30.2, 11.9],
    },
    "04": {
      food: [10.2, 11.5, 2.5],
      fuel: [],
    },
  },
  "2023-04": {},
};

const runSolution = () => {
  console.log(solution(expenses));
};

module.exports = { runSolution };
