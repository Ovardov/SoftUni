function manageTickets(ticketInfo, sortMethod) {
    let allTickets = [];

    class Ticket {
        constructor(destination, price, status) {
            this.destination = destination;
            this.price = price;
            this.status = status;
        }
    }

    for (let token of ticketInfo) {
        let [destination, price, status] = token.split('|');
        price = +price;

        let currentTicket = new Ticket(destination, price, status);
        allTickets.push(currentTicket);
    }

    if (sortMethod === 'price') {
        return allTickets.sort((a, b) => a[sortMethod] - b[sortMethod]);
    } else {
        return allTickets.sort((a, b) => a[sortMethod].localeCompare(b[sortMethod]));
    }

}

console.log(manageTickets(
    ['Philadelphia|94.20|available',
        'New York City|95.99|available',
        'New York City|95.99|sold',
        'Boston|126.20|departed'],
    'price'));