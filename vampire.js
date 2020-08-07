class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVampires = 0;

    if (this.creator) {
      numberOfVampires +=
        this.creator.numberOfOffspring +
        this.creator.numberOfVampiresFromOriginal
    }
    return numberOfVampires;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    if (this.name === name) {
      return this;
    }
    for (const babies of this.offspring) {
      // console.log(babies);
      const foundBabies = babies.vampireWithName(name);
      if (foundBabies) {
        // console.log(foundBabies);
        return foundBabies;
      }
    }
    return null
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let total = 0; // 1

    // Use depth first traversal to calculate the total employees
    for (const off of this.offspring) {
      // console.log(sub.n ame);
      total++
      total += off.totalDescendents;
    }
    return total;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let millennial = [];

    if (this.yearConverted > 1980) {
      // pushing the object of those who are converted after 1980
      millennial.push(this);
    }
    // looking for the coolkids of this(the object that was pushed above) offspring
    //doing recursion
    for (const coolKids of this.offspring) {
      const foundTheKoolKids = coolKids.allMillennialVampires;
      millennial = millennial.concat(foundTheKoolKids);
    }

    return millennial;
  }



  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {

  }
}

module.exports = Vampire;

