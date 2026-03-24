let person = {
  firstName: 'John',
  lastName: 'Doe',
  // fullName: function() {
  //     return this.firstName + " " + this.lastName;
  // }
}

// console.log(person.fullName()); // Output: John Doe

let fullName = function (hometown, greeting) {
  console.log(
    greeting + ', ' + this.firstName + ' ' + this.lastName + ' from ' + hometown
  )
  return (
    greeting + ', ' + this.firstName + ' ' + this.lastName + ' from ' + hometown
  )
}

// fullName.call(person, "New York", "Hi"); // Output: Hi, John Doe from New York
// fullName.apply(person, ["New York", "Hi"]); // Output: Hi, John Doe from New York
let boundFullName = fullName.bind(person, 'New York', 'Hi')
boundFullName() // Output: Hi, John Doe from New York

Function.prototype.bind2 = function (...args) {
  let self = this
  let params = args.slice(1)
  return function (...args2) {
    return self.apply(args[0], [...params, ...args2])
  }
}

let testFullName = fullName.bind2(person, 'Los Angeles')
testFullName('Hi') // Output: Hi, John Doe from Los Angeles

//Function Currying

// Using bind to create a multiplier function
// let multiply = function (a, b) {
//     console.log(a * b);
// }

// let multiplyBy2 = multiply.bind(this, 2);
// multiplyBy2(5); // Output: 10

// let multiplyBy3 = multiply.bind(this, 3);
// multiplyBy3(10); // Output: 30

//Using closures to create a multiplier function

let multiply = function (a) {
  return function (b) {
    console.log(a * b)
  }
}

let multiplyBy2 = multiply(2)
multiplyBy2(5) // Output: 10

let multiplyBy3 = multiply(3)
multiplyBy3(10) // Output: 15

const sum = (...args) => {
  return args.reduce((acc, curr) => acc + curr, 0)
}

const largest = (...args) => {
  if (args.length === 0) return null // Handle case with no arguments
  return args.reduce((max, curr) => (curr > max ? curr : max))
}

console.log(sum(1, 2, 3, 4)) // Output: 10
console.log(largest(-10, -2, -3, -1))

function x() {
  let a = 10
  setTimeout(() => {
    console.log(a)
  }, 2000)
  a = 30
}

x() // Output: 20 after 2 seconds

const mapFilterArrayList = [
  { firstName: 'John', lastName: 'Doe', age: 25 },
  { firstName: 'Jane', lastName: 'Smith', age: 30 },
  { firstName: 'Emily', lastName: 'Johnson', age: 22 },
  { firstName: 'Emmanuel', lastName: 'Jones', age: 20 },
]

const firstNameForAgeLessThan25 = (acc, person) => {
  if (person.age >= 25) {
    acc.push(person.firstName)
  }
  return acc
}

const output = mapFilterArrayList.reduce(firstNameForAgeLessThan25, [])
console.log(output) // Output: ["Emily", "Emmanuel"]

/*
promises in javascript are objects that represent eventual completion/failure of an async operations
Promises are required or needed to prevent the classic callback hell problems and the inversion of control
Promises have three states: pending, fulfilled, and rejected.
Promises has state and result, 
state can be pending, fulfilled, or rejected, 
and result is the value that the promise resolves to or the reason it was rejected.

Promises in JavaScript are used to handle asynchronous operations. 
A Promise is an object that represents the eventual completion (or failure) of an asynchronous operation 
and its resulting value. Promises provide a cleaner and more manageable way to work with asynchronous code 
compared to traditional callback functions.
*/

const cartItems = ['item1', 'item2', 'item3']

const createOrder = (cart) => {
  return new Promise(function (resolve, reject) {
    if (cart.length > 0) {
      resolve('orderId')
    } else {
      let err = new Error('Cart is empty')
      reject(err)
    }
  })
}

const processPayment = (orderId) => {
  return new Promise(function (resolve, reject) {
    if (orderId) {
      resolve('paymentInfo')
    } else {
      let err = new Error('Invalid orderId')
      reject(err)
    }
  })
}

const orderSummary = (paymentInfo) => {
  return new Promise(function (resolve, reject) {
    if (paymentInfo) {
      resolve('orderSummary')
    } else {
      let err = new Error('Invalid paymentInfo')
      reject(err)
    }
  })
}

const updateWallet = (orderSummary) => {
  return new Promise(function (resolve, reject) {
    if (orderSummary) {
      resolve('wallet updated')
    } else {
      let err = new Error('Invalid orderSummary')
      reject(err)
    }
  })
}

createOrder(cartItems)
  .then((response) => {
    return response
  })
  .catch((error) => {
    console.log(error)
  })
  .then((orderId) => {
    console.log(orderId)
    return processPayment(orderId)
  })
  .then((paymentInfo) => {
    console.log(paymentInfo)
    return orderSummary(paymentInfo)
  })
  .then((orderSummary) => {
    console.log(orderSummary)
    return updateWallet(orderSummary)
  })
  .then((walletUpdateStatus) => {
    console.log(walletUpdateStatus)
  })
  .catch((error) => {
    console.log(error)
  })
