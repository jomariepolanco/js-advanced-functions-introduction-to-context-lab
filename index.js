// Your code here
const createEmployeeRecord = (employeInfoArray) => {
    const firstName = employeInfoArray[0]
    const familyName = employeInfoArray[1]
    const title = employeInfoArray[2]
    const payPerHour = employeInfoArray[3]
    const timeInEvents = []
    const timeOutEvents = []
    return {firstName, familyName, title, payPerHour, timeInEvents, timeOutEvents}
}

const createEmployeeRecords = (employeeRecordsArray) => {
    let employeeArrayOfObjects = []
    employeeRecordsArray.forEach(employee => {
        employeeArrayOfObjects.push(createEmployeeRecord(employee))
    })
    return employeeArrayOfObjects
}

const createTimeInEvent = (employeeObj, dateStamp) => {
    const type = "TimeIn"
    const hour = parseInt(dateStamp.split(" ")[1])
    const date = dateStamp.split(" ")[0]
    employeeObj.timeInEvents.push({type, hour, date})
    return employeeObj
}

const createTimeOutEvent = (employeeObj, dateStamp) => {
    const type = "TimeOut"
    const hour = parseInt(dateStamp.split(" ")[1])
    const date = dateStamp.split(" ")[0]
    employeeObj.timeOutEvents.push({type, hour, date})
    return employeeObj
}

const hoursWorkedOnDate = (employeeObj, date) => {
    let timeIn = employeeObj.timeInEvents.find((time) => time.date === date)
    let timeOut = employeeObj.timeOutEvents.find((time) => time.date === date) 
    const hoursWorked = (timeOut.hour - timeIn.hour) / 100 
    return hoursWorked 
}

const wagesEarnedOnDate = (employeeObj, date) => {
    const hoursWorked = hoursWorkedOnDate(employeeObj, date)
    return employeeObj.payPerHour * hoursWorked
}

const allWagesFor = (employeeObj) => {
    const dates = employeeObj.timeInEvents.map(date => {
        return date.date   
    })
    const wages = dates.reduce((total, date) => {
        return total + wagesEarnedOnDate(employeeObj, date)
    }, 0)
    return wages 
}

const findEmployeeByFirstName = (srcArray, firstName) => {
    return srcArray.find(employee => employee.firstName === firstName)
}

const calculatePayroll = (srcArray) => {
    const allWages = srcArray.map(employee => allWagesFor(employee))
    return allWages.reduce((total, wages) => total + wages)
}