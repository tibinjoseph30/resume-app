export function calculateExperience(joinDate, relieveDate) {
    const join = new Date(joinDate);
    const relieve = relieveDate ? new Date(relieveDate) : new Date();

    let totalYears = relieve.getFullYear() - join.getFullYear();
    let totalMonths = relieve.getMonth() - join.getMonth();
    
    if (totalMonths < 0) {
        totalYears--;
        totalMonths += 12;
    }

    return {
        years: totalYears,
        months: totalMonths
    };
}

export function calculateTotalExperience(experiences) {
    let totalYears = 0;
    let totalMonths = 0;

    experiences.forEach(exp => {
        const { years, months } = calculateExperience(exp.data.joinDate, exp.data.relieveDate);
        totalYears += years;
        totalMonths += months;
    });

    // Adjust months if totalMonths exceeds 12
    totalYears += Math.floor(totalMonths / 12);
    totalMonths = totalMonths % 12;

    return {
        years: totalYears,
        months: totalMonths
    };
}
