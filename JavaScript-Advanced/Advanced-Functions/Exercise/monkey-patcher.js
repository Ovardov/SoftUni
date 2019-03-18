let solution = function (command) {

    const upVote = () => {
        this.upvotes++;
    };

    const downVote = () => {
        this.downvotes++;
    };

    const score = () => {
        let result = [];

        let totalVotes = this.upvotes + this.downvotes;
        let upVotesPercent = this.upvotes / totalVotes * 100;
        let balance = this.upvotes - this.downvotes;
        let rating = '';

        if (upVotesPercent > 66) {
            rating = 'hot';
        } else if (balance >= 0 && totalVotes > 100) {
            rating = 'controversial';
        } else if (balance < 0) {
            rating = 'unpopular';
        }

        if (totalVotes < 10 || rating === '') {
            rating = 'new';
        }

        let maxVotes = Math.max(this.upvotes, this.downvotes);
        let percentage = Math.ceil(maxVotes * 0.25);

        if (totalVotes > 50) {
            result.push(this.upvotes + percentage, this.downvotes + percentage, balance, rating);
        } else {
            result.push(this.upvotes, this.downvotes, balance, rating);
        }

        return result;
    };


    if (command === 'upvote') {
        upVote();
    } else if (command === 'downvote') {
        downVote();
    } else if (command === 'score') {
        let printResult = score();

        return printResult;
    }

};

let forumPost = {
    id: '3',
    author: 'emil',
    content: 'wazaaaaa',
    upvotes: 100,
    downvotes: 100
};



solution.call(forumPost, 'upvote');
solution.call(forumPost, 'downvote');

console.log(solution.call(forumPost, 'score'));

for (let i = 0; i < 50; i++) {
    solution.call(forumPost, 'downvote');
}
console.log(solution.call(forumPost, 'score'));



