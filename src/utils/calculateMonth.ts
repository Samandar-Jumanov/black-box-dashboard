function getRemainingMonths(startMonthIndex : number ) {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return monthNames.slice(startMonthIndex);
  }


  export default getRemainingMonths