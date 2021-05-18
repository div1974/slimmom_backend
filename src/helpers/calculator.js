const calculator = (body) => {
  const { height, age, currentWeight, desiredWeight, /* bloodGroup */ } = body
  const dailyCaloriesIntake =
    10 * currentWeight + 6.25 * height - 5 * age - 161 - 10 *
    (currentWeight - desiredWeight)
  return dailyCaloriesIntake
}

module.exports = calculator
