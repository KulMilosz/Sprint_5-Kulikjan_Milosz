peoples = [
  {
    firstName: false,
    lastName: 2,
  },
  {
    firstName: "Roman",
    lastName: "Kowalski",
  },

  {
    firstName: "Halina",
    lastName: "Malina",
  },
  {
    firstName: "B",
    lastName: "22",
  },
  {
    firstName: "Jan",
    lastName: "Nowak",
  },
  {
    firstName: "Kamil",
    lastName: null,
  },
];

const arrayWithNicknames = nickNameGenerator(peoples);
const arrayWithAge = ageGenerator(arrayWithNicknames);
const arrayWithMostCommonLetters = mostCommonLetter(arrayWithAge);

function reverseString(str) {
  return str.split("").reverse().join("");
}

function nickNameGenerator(array) {
  return array.map((person) => {
    let firstNameChange = "";
    let lastNameChange = "";
    if (
      typeof person.firstName === "string" &&
      person.firstName.trim().length >= 3
    ) {
      firstNameChange = reverseString(person.firstName.slice(-3));
    }
    if (
      typeof person.lastName === "string" &&
      person.lastName.trim().length >= 3
    ) {
      lastNameChange = reverseString(person.lastName.slice(0, 3));
    }
    if (firstNameChange && lastNameChange) {
      let nickName = firstNameChange + lastNameChange;
      nickName =
        nickName.charAt(0).toUpperCase() + nickName.slice(1).toLowerCase();
      return { ...person, nickname: nickName };
    }
    return person;
  });
}

function ageGenerator(array) {
  return array
    .filter((person) => person.nickname && person.nickname.length > 0)
    .map((person, index) => {
      const lengthSum =
        (person.firstName ? person.firstName.length : 0) +
        (person.lastName ? person.lastName.length : 0);
      let age;
      if (lengthSum % 2 === 0) {
        age = lengthSum;
      } else {
        const totalLengthSum = Object.keys(person)
          .filter(
            (key) =>
              key === "firstName" || key === "lastName" || key === "nickname"
          )
          .reduce((sum, key) => sum + key.length, 0);
        const divisor = index === 0 ? 1 : index;
        age = totalLengthSum / divisor;
      }
      age = Math.ceil(age);
      return { ...person, age };
    });
}

function mostCommonLetter(array) {
  return array.map((person) => {
    const counts = {};
    const keysToCount = Object.values(person)
      .filter((value) => typeof value === "string")
      .map((value) => value.toLowerCase());
    keysToCount.forEach((element) => {
      for (const letter of element) {
        if (counts[letter]) {
          counts[letter] += 1;
        } else {
          counts[letter] = 1;
        }
      }
    });
    let maxCount = 0;
    let maxLetter = "";
    for (const [letter, count] of Object.entries(counts)) {
      if (count > maxCount || (count === maxCount && letter < maxLetter)) {
        maxCount = count;
        maxLetter = letter;
      }
    }
    return {
      ...person,
      mostCommonLetter: { letter: maxLetter, count: maxCount },
    };
  });
}
console.log(arrayWithMostCommonLetters);
