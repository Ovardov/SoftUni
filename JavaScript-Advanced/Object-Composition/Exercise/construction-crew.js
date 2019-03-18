function modifyProperties(obj) {

    if (obj.handsShaking === true) {
        obj.bloodAlcoholLevel += obj.weight * 0.1 * obj.experience;
        obj.handsShaking = false;
    }

    return obj;
}

console.log(modifyProperties(
    {
        weight: 80,
        experience: 1,
        bloodAlcoholLevel: 0,
        handsShaking: true
    }));