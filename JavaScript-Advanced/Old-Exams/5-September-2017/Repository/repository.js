class Repository {
    constructor(props) {
        this.props = props;
        this.data = new Map();
    }

    get count() {
        return Array.from(this.data.keys()).length
    }

    add(entity) {

        this.validateProps(this.props, entity);

        let allID = Array.from(this.data.keys());

        let idForData;

        if (allID.length === 0) {
            idForData = 0;
            this.data.set(0, entity);
        } else {
            idForData = +allID[allID.length - 1] + 1;
            this.data.set(idForData, entity);
        }

        return idForData;
    }


    validateProps(oldProps, entity) {
        if (Object.keys(entity).length === Object.keys(this.props).length) {
            for (let i = 0; i < Object.keys(oldProps).length; i++) {
                let [originalKey, originalValue] = Object.entries(oldProps)[i];
                let [entityKey, entityValue] = Object.entries(entity)[i];

                if (originalKey !== entityKey) {
                    throw Error(`Property ${originalKey} is missing from the entity!`);
                } else if (originalValue !== typeof entityValue) {
                    throw TypeError(`Property ${entityValue} is of incorrect type!`);
                }
            }
        } else {
            let differentProps = '';

            Object.keys(this.props)
                .forEach((x, i) => {
                    if (x !== Object.keys(entity)[i]) {
                        differentProps = x;
                    }
                });

            if (differentProps !== '') {
                throw Error(`Property ${differentProps} is missing from the entity!`);
            }
        }

    }

    get(id) {
        if (this.data.has(id)) {
            return this.data.get(id);
        } else {
            throw Error(`Entity with id: ${id} does not exist!`);
        }
    }

    update(id, newEntity) {
        if (this.data.has(id)) {
            this.validateProps(this.props, newEntity);

            this.data.set(id, newEntity);
        } else {
            throw Error(`Entity with id: ${id} does not exist!`);
        }
    }

    del(id) {
        if (this.data.has(id)) {
            this.data.delete(id);
        } else {
            throw Error(`Entity with id: ${id} does not exist!`);
        }
    }
}

let props = {
    name: "string",
    age: "number"
};

let repo = new Repository(props);

let e1 = {
    name: "Pesho",
    age: 19
};


console.log(repo.add(e1));
console.log(repo.count);
console.log(repo.add(e1));

repo.update(1, {name: 'Kiril', age: 19});

console.log(repo.get(2));